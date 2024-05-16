"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLink } from "@refinedev/core";
import { EllipsisVertical } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

interface RowActionsProps {
  children?: ReactNode;
}

export type RowActionProps = PropsWithChildren & {
  to?: string;
  title?: string;
  asChild?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: (event: any) => void;
};

export const RowAction = (props: RowActionProps) => {
  const Link = useLink();
  return (
    <DropdownMenuItem
      onSelect={() => console.log("ok")}
      disabled={props.disabled}
      asChild={!(!props.to || (!props.to && !props.children))}
      onClick={props.onClick}
      className={cn("cursor-pointer", props.className)}
    >
      {props.asChild ? (
        props.children
      ) : props.to ? (
        <Link
          disabled={props.disabled}
          replace={false}
          to={props.to}
          title={props.title}
        >
          {props.icon ? <span className="mr-2">{props.icon}</span> : null}
          {props.title}
        </Link>
      ) : (
        <>
          {props.icon ? <span className="mr-2">{props.icon}</span> : null}
          {props.title}
        </>
      )}
    </DropdownMenuItem>
  );
};

export function RowActions({ children }: RowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
