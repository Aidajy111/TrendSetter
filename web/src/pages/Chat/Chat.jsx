import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Package, Search, Send, Sparkles } from 'lucide-react';
import styles from './Chat.module.css';

const chatThreads = [
  {
    id: 'support',
    title: 'TrendSetter поддержка',
    role: 'Помощь с заказом и размером',
    icon: MessageCircle,
    unread: 1,
    status: 'онлайн',
    messages: [
      { id: 's1', author: 'support', text: 'Здравствуйте! Я помогу подобрать размер и оформить заказ.', time: '10:12' },
      { id: 's2', author: 'me', text: 'Нужна консультация по куртке.', time: '10:14' },
      { id: 's3', author: 'support', text: 'Напишите рост, размер и желаемую посадку: свободная или по фигуре.', time: '10:15' },
    ],
  },
  {
    id: 'order',
    title: 'Заказ TS-2047',
    role: 'Уведомления о заказе',
    icon: Package,
    unread: 1,
    status: 'обновлено 5 минут назад',
    messages: [
      { id: 'o1', author: 'system', text: 'Заказ TS-2047 принят в обработку.', time: '09:30' },
      { id: 'o2', author: 'system', text: 'Дизайнер подтвердит детали и сроки пошива сегодня.', time: '09:31' },
      { id: 'o3', author: 'me', text: 'Хочу уточнить доставку в Иркутск.', time: '09:35' },
    ],
  },
  {
    id: 'designer',
    title: 'Лариса Долина',
    role: 'Дизайнер куртки',
    icon: Sparkles,
    unread: 2,
    status: 'онлайн',
    messages: [
      { id: 'd1', author: 'designer', text: 'Здравствуйте! Я посмотрела ваш запрос на кастомизацию.', time: '12:20' },
      { id: 'd2', author: 'designer', text: 'Можно заменить пуговицы и сделать воротник крупнее.', time: '12:22' },
      { id: 'd3', author: 'me', text: 'Отлично. Еще хочу оставить молочный цвет и добавить вышивку на рукав.', time: '12:25' },
    ],
  },
];

export default function Chat() {
  const { dialogId } = useParams();
  const initialThreadId = chatThreads.some((thread) => thread.id === dialogId) ? dialogId : 'support';
  const [activeThreadId, setActiveThreadId] = useState(initialThreadId);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(() => Object.fromEntries(chatThreads.map((thread) => [thread.id, thread.messages])));
  const [readThreads, setReadThreads] = useState([initialThreadId]);

  const filteredThreads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized
      ? chatThreads.filter((thread) => [thread.title, thread.role].some((value) => value.toLowerCase().includes(normalized)))
      : chatThreads;
  }, [query]);

  const activeThread = chatThreads.find((thread) => thread.id === activeThreadId) || chatThreads[0];
  const ActiveIcon = activeThread.icon;
  const activeMessages = messages[activeThread.id] || [];

  const openThread = (threadId) => {
    setActiveThreadId(threadId);
    setReadThreads((current) => (current.includes(threadId) ? current : [...current, threadId]));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => ({
      ...current,
      [activeThread.id]: [
        ...(current[activeThread.id] || []),
        { id: `${activeThread.id}-${Date.now()}`, author: 'me', text, time: 'сейчас' },
      ],
    }));
    setDraft('');
  };

  return (
    <main className={styles.chatPage}>
      <section className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <div>
              <span>Сообщения</span>
              <h1>Чаты</h1>
            </div>
            <Link to="/contacts">Помощь</Link>
          </div>
          <label className={styles.search}>
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск диалога" />
          </label>
          <div className={styles.threadList}>
            {filteredThreads.map((thread) => {
              const Icon = thread.icon;
              const isActive = thread.id === activeThread.id;
              const isRead = readThreads.includes(thread.id);

              return (
                <button
                  className={`${styles.thread} ${isActive ? styles.activeThread : ''}`}
                  key={thread.id}
                  type="button"
                  onClick={() => openThread(thread.id)}
                >
                  <span>
                    <Icon size={19} />
                  </span>
                  <div>
                    <b>{thread.title}</b>
                    <small>{thread.role}</small>
                  </div>
                  {!isRead && thread.unread > 0 && <em>{thread.unread}</em>}
                </button>
              );
            })}
          </div>
        </aside>

        <section className={styles.dialog}>
          <header className={styles.dialogHeader}>
            <span>
              <ActiveIcon size={22} />
            </span>
            <div>
              <h2>{activeThread.title}</h2>
              <p>
                <CheckCircle2 size={14} />
                {activeThread.status}
              </p>
            </div>
          </header>

          <div className={styles.messages}>
            {activeMessages.map((message) => (
              <article className={`${styles.message} ${message.author === 'me' ? styles.mine : ''}`} key={message.id}>
                <p>{message.text}</p>
                <span>{message.time}</span>
              </article>
            ))}
          </div>

          <form className={styles.composer} onSubmit={sendMessage}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Напишите сообщение" />
            <button type="submit" aria-label="Отправить сообщение">
              <Send size={20} />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
