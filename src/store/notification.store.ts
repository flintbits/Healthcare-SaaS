import { create } from "zustand";


type Notification = {
  id: string;
  title: string;
  read: boolean;
};

type NotificationStore = {
  notifications: Notification[];
  add: (n: Notification) => void;
  markRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  add: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications],
    })),

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
