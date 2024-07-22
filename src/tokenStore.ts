import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface token {
  token: string;
  userId: string;
  setToken: (data: string) => void;
  setUserId: (data: string) => void;
}

const useTokenStore = create<token>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        userId: "",
        setToken: (data: string) => set({ token: data }),
        setUserId: (data: string) => set({userId: data}),
      }),
      {
        name: "token-store",
      }
    )
  )
);

export default useTokenStore;
