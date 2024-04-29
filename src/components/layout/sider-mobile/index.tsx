import type { FC, ReactNode } from "react";
import type { SidebarMobileProps } from "./type";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const SidebarMobile: FC<SidebarMobileProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        {children as ReactNode}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
