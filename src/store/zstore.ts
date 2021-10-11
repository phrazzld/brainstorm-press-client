import create from "zustand";

export type LndNode = {
  token: string;
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
}

export type User = {
  _id: string;
  name: string;
  blog: string;
  node: LndNode;
};

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
