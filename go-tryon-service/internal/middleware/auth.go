package middleware

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func Auth(jwtSecret string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			ctx.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		tokenString := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
		if tokenString == "" {
			ctx.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(jwtSecret), nil
		})
		if err != nil || !token.Valid {
			ctx.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		userID, ok := userIDFromClaims(claims)
		if !ok {
			ctx.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		ctx.Set("userID", userID)
		ctx.Next()
	}
}

// userIDFromClaims: Strapi users-permissions JWT uses numeric "id", not "user_id".
func userIDFromClaims(claims jwt.MapClaims) (string, bool) {
	if v, ok := claims["id"]; ok {
		switch id := v.(type) {
		case float64:
			return strconv.FormatInt(int64(id), 10), true
		case string:
			if id != "" {
				return id, true
			}
		}
	}

	if v, ok := claims["user_id"]; ok {
		if s, ok := v.(string); ok && s != "" {
			return s, true
		}
	}

	return "", false
}
