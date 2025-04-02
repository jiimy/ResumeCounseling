import { create } from "zustand";

interface User {
  email: string;
  setEmail: (text: string) => void;
  name: string;
  setName: (text: string) => void;
}

export const UserStore = create<User>()((set) => ({
  email: "",
  setEmail: (text: string) => set({ email: text }),
  name: "",
  setName: (text: string) => set({ name: text }),
}));
