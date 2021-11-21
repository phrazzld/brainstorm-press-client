import create from "zustand";
import { User } from "../utils/types";

type Store = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  lnToken: string;
  setLnToken: (lnToken: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useStore = create<Store>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken: accessToken }),

  lnToken: "",
  setLnToken: (lnToken: string) => set({ lnToken: lnToken }),

  user: null,
  setUser: (user: User | null) => set({ user: user }),
}));
