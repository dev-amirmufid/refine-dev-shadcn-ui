import { CanAccess, useLink, useMenu, type ITreeMenu } from "@refinedev/core";
import { List } from "lucide-react";
import { useMemo, type FC, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ThemedSiderV2Props } from "./type";
import { ScrollArea } from "@/components/ui/scroll-area";

const ThemedSiderV2MenuItem: FC<{
  selectedKey?: string;
  resource: ITreeMenu;
  asChild?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
}> = ({ resource, selectedKey, asChild = false, children }) => {
  const Link = useLink();
  const active = useMemo(() => {
    return resource.key === selectedKey;
  }, [resource, selectedKey]);

  const label = useMemo(() => {
    return String(resource.label ?? resource.meta?.label);
  }, [resource]);

  const href = useMemo(() => {
    return String(resource.route);
  }, [resource]);

  return (
    <CanAccess
      resource={resource.name.toString()}
      action="list"
      params={{
        resource,
      }}
    >
      <Link
        to={href}
        title={label as string}
        className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
          active ? "text-primary bg-muted" : "text-muted-foreground"
        }`}
      >
        {resource.icon ?? <List size={20} />}
        {asChild ? children : label}
      </Link>
    </CanAccess>
  );
};

export const ThemedSiderV2Menu: FC<{
  meta?: Record<string, unknown>;
}> = ({ meta }) => {
  const { menuItems, selectedKey } = useMenu({ meta });

  const MenuItems = useMemo(
    () =>
      menuItems.map((item: ITreeMenu) => (
        <ThemedSiderV2MenuItem
          key={item.key}
          resource={item}
          selectedKey={selectedKey}
        />
      )),
    [menuItems, selectedKey]
  );

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {MenuItems}
    </nav>
  );
};
const defaultIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V6Z"
      fill="currentColor"
    />
  </svg>
);

const DefaultTitle = () => {
  const Link = useLink();
  return (
    <Link
      to="/"
      title={"refine"}
      className="text-foreground inline-flex flex-row items-center"
    >
      {defaultIcon}
      <span className="ml-2.5 text-xl font-bold">{"refine"}</span>
    </Link>
  );
};

export const ThemedSiderV2: FC<ThemedSiderV2Props> = ({
  meta,
  className,
  Title = DefaultTitle,
}) => {
  return (
    <div className={cn("border-r bg-muted/40 md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          {typeof Title === "function" ? <Title collapsed={false} /> : Title}
        </div>
        <div className="flex-1">
          <ScrollArea className="w-full h-[calc(100vh-68px)]">
            <ThemedSiderV2Menu meta={meta} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ThemedSiderV2;
