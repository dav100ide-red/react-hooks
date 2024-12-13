import { createContext } from "react";

export const Hooks1StateContext = createContext<{
  isRed: boolean;
}>({ isRed: false });
