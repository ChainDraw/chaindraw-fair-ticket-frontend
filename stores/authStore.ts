// authStore.ts
import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { create } from "zustand";

interface AuthState {
  authStatus: AuthenticationStatus;
  setAuthStatus: (status: AuthenticationStatus) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authStatus: "loading",
  setAuthStatus: (status: AuthenticationStatus) => {
    console.log(`Auth status set to: ${status}`);
    set({ authStatus: status });
  },
}));

export default useAuthStore;
