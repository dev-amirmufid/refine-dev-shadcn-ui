import Header from "./header";
import ThemedSiderV2 from "./sider";
import SidebarMobile from "./sider-mobile";
import { Toaster } from "@/components/ui/toaster";
import type { LayoutProps } from "./type";
import { Breadcrumb } from "../breadcrumb";
import { CircleUser, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const ThemedLayoutV2: React.FC<LayoutProps> = ({
  children,
  darkModeProvider,
  defaultDarkMode,
  storageKey,
  Title,
  Footer,
}) => {
  const Container = () => {
    return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ThemedSiderV2 className="hidden" Title={Title} />
        <div className="flex flex-col md:col-start-2 ">
          <Header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <SidebarMobile>
              <ThemedSiderV2 Title={Title} />
            </SidebarMobile>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Breadcrumb />
            {children}
          </main>

          {Footer ? (
            <Footer />
          ) : (
            <footer className="py-2.5 border-t border-border mt-4 flex-none flex flex-row items-center justify-between px-4 text-xs gap-x-4">
              <span>
                <a href="https://amirmufid.site">amirmufid</a> © 2024
              </span>
              <div className="flex flex-row justify-end items-center relative gap-x-4">
                Powered by <a href="https://refine.dev">refine.dev</a>
              </div>
            </footer>
          )}
        </div>
        <Toaster />
      </div>
    );
  };

  if (darkModeProvider) {
    console.log("DARK MODE");
    return <Container />;
  }

  return <Container />;
};

export { ThemedSiderV2 };
