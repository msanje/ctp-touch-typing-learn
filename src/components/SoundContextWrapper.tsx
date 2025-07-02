"use client";

import { ReactNode } from "react";
import { SoundProvider } from "./SoundContext";

interface SoundWrapperProps {
  children: ReactNode;
}

export default function SoundContextWrapper({ children }: SoundWrapperProps) {
  return <SoundProvider>{children}</SoundProvider>;
}
