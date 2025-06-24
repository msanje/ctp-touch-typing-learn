import { create } from "zustand";

type AuthType = "signin" | "signup";

type AuthModalStore = {
  isOpen: boolean;
  type: AuthType | null;
  open: (type: AuthType) => void;
  close: () => void;
};

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  type: null,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}));
