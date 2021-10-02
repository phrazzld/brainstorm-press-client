import create from "zustand";

type User = {
  _id: string;
  name: string;
  blog: string;
  jwtToken: string;
  nodeId: string;
};

type Store = {
  lndToken: string;
  setLndToken: (lndToken: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useStore = create<Store>((set) => ({
  lndToken: "",
  setLndToken: (lndToken: string) => set({ lndToken: lndToken }),

  user: null,
  setUser: (user: User | null) => set({ user: user }),
}));
