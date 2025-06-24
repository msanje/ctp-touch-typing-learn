"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import AuthModal from "./AuthModal";

export default function AuthModalWrapper() {
  const { isOpen, type, close } = useAuthModal();

  if (!isOpen || !type) return null;

  return <AuthModal onClose={close} type={type} />;
}
