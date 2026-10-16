"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Applies the user's reduced-motion preference to every Framer Motion animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
