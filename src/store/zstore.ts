import create from "zustand";
import { User } from "../types";

type Store = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  lndToken: string;
  setLndToken: (lndToken: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useStore = create<Store>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken: accessToken }),

  lndToken: "",
  setLndToken: (lndToken: string) => set({ lndToken: lndToken }),

  user: null,
  setUser: (user: User | null) => set({ user: user }),
}));
