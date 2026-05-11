import { dialogs, messages } from '../data/mockMessages.js';

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 180));

export const messagesApi = {
  getDialogs: () => wait(dialogs),
  getMessages: (dialogId) => wait(messages[dialogId] || []),
  sendMessage: (dialogId, text) =>
    wait({ id: Date.now().toString(), dialogId, text, author: 'me', createdAt: new Date().toISOString() }),
};
