import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
  uid: string;
  name: string
  email: string | null;
}


type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    }
  )
);
