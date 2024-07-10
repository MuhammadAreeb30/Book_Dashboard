import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface token {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<token>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
      }),
      {
        name: "token-store",
      }
    )
  )
);

export default useTokenStore;
