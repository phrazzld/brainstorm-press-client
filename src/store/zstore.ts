import create from "zustand";

type Store = {
  jwt: string;
  setJwt: (jwt: string) => void;
  lndToken: string;
  setLndToken: (lndToken: string) => void;
};

export const useStore = create<Store>((set) => ({
  jwt: "",
  setJwt: (jwt: string) => set({ jwt: jwt }),

  lndToken: "",
  setLndToken: (lndToken: string) => set({ lndToken: lndToken }),
}));
