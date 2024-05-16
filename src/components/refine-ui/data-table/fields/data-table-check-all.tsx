import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandGroup } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { BaseRecord, HttpError } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import { EllipsisVertical } from "lucide-react";
import type { PropsWithChildren } from "react";

type CheckAllProps = Omit<
  UseTableReturnType<BaseRecord, HttpError>,
  "refineCore"
> &
  PropsWithChildren;

export const CheckAll: React.FC<CheckAllProps> = ({ children, ...table }) => {
  const {
    getIsAllPageRowsSelected,
    getIsSomeRowsSelected,
    toggleAllPageRowsSelected,
    getState,
  } = table;

  const selectedRows = Object.entries(getState().rowSelection).length;
  const isAllPageRowsSelected = getIsAllPageRowsSelected();
  const isSomeRowsSelected = getIsSomeRowsSelected();

  return (
    <div className="inline-flex items-center justify-center gap-2">
      <Checkbox
        checked={
          isSomeRowsSelected ||
          (isAllPageRowsSelected == false && selectedRows > 0)
            ? "indeterminate"
            : isAllPageRowsSelected
        }
        onCheckedChange={(value) => toggleAllPageRowsSelected(!!value)}
        className="translate-y-[2px]"
        aria-label="Select all"
      />
      {children && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={!(isSomeRowsSelected || isAllPageRowsSelected)}
              size={"icon"}
              variant={"ghost"}
              className="px-0 w-5"
            >
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full max-w-full sm:w-[200px] p-0"
            align="start"
          >
            <Command>
              <CommandGroup heading="Bulk Actions">{children}</CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
