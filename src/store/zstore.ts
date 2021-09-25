import create from "zustand";

type Store = {
  jwt: string;
  setJwt: (jwt: string) => void;
};

export const useStore = create<Store>((set) => ({
  jwt: "",
  setJwt: (jwt: string) => set({ jwt: jwt }),
}));
