import type { DarkModeProps } from "@/components/dark-mode/type";
import type { ReactElement } from "react";

export type HeaderProps = DarkModeProps & {
  children?: ReactElement;
};
