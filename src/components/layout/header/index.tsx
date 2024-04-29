import * as React from "react";
import type { HeaderProps } from "./type";
import { DarkMode } from "@/components/refine-ui/dark-mode";

export const Header: React.FC<HeaderProps> = ({ children, darkMode }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {children}
      {darkMode && <DarkMode />}
    </header>
  );
};

export default Header;
