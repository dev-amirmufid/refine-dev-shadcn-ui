import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { flexRender, type Header } from "@tanstack/react-table";
import { DataTablePagination } from "./fields";
import type { UseTableReturnType } from "@refinedev/react-table";
import type { BaseRecord, HttpError } from "@refinedev/core";
import { CheckAll } from "./fields/data-table-check-all";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  EyeOffIcon,
  Filter,
  LoaderCircle,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TableVirtuoso } from "react-virtuoso";
import { useWindowSize } from "usehooks-ts";
import { RowActions } from "./actions";
import { ShowAction } from "./actions/show";
import { EditAction } from "./actions/edit";
import { DeleteAction } from "./actions/delete";

export const DataTable = ({
  ...tableProps
}: UseTableReturnType<BaseRecord, HttpError>) => {
  const {
    getHeaderGroups,
    getRowModel,
    getAllColumns,
    getState,
    setGlobalFilter,
    getTotalSize,
    refineCore: { tableQueryResult },
  } = tableProps;
  const { globalFilter } = getState();
  const { isFetching, refetch, isSuccess } = tableQueryResult;
  const rows = getRowModel().rows;

  const { height = 0 } = useWindowSize();
  // const { width = 0, height = 0 } = useWindowSize();

  const tableContainerRef = React.useRef<HTMLDivElement>();

  const renderColumnHeader = (header: Header<BaseRecord, unknown>) => {
    const { column } = header;
    const {
      getCanFilter,
      getCanSort,
      getCanHide,
      getIsSorted,
      toggleSorting,
      toggleVisibility,
      columnDef,
    } = column;

    if (
      typeof columnDef.header == "function" ||
      (!getCanFilter() && !getCanSort() && !getCanHide())
    )
      return columnDef.header;

    return (
      <div className={cn("flex items-center space-x-2")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{columnDef.header}</span>
              {getIsSorted() === "desc" ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : getIsSorted() === "asc" ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : getCanSort() ? (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {getCanFilter() && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => console.log("filter")}>
                    <Filter className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Filter
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            {getCanSort() && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toggleSorting(false)}>
                    <ChevronUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Sort Asc
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleSorting(true)}>
                    <ChevronDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Sort Desc
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            {getCanHide() && (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => toggleVisibility(false)}>
                  <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Hide
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        {isFetching && isSuccess ? (
          <div className="z-50 absolute flex items-center justify-center bg-white/50  w-full h-full">
            <LoaderCircle className=" h-8 w-8 animate-spin" />
          </div>
        ) : null}

        <TableVirtuoso
          style={{ height: height - 323 }}
          totalCount={rows.length}
          data={rows}
          components={{
            Table: ({ style, ...props }) => {
              const tableWidth = getTotalSize();
              return (
                <Table
                  className="w-full border-collapse border-spacing-0"
                  style={{
                    ...style,
                    width:
                      !tableContainerRef?.current?.offsetWidth ||
                      tableWidth <= tableContainerRef?.current?.offsetWidth
                        ? "100%"
                        : tableWidth,
                  }}
                  {...props}
                />
              );
            },
            TableRow: (props) => {
              const index = props["data-index"];
              const row = rows[index];

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  {...props}
                />
              );
            },
            EmptyPlaceholder: (props) => {
              return (
                <TableBody {...props}>
                  {isSuccess ? (
                    <TableRow>
                      <TableCell
                        colSpan={getAllColumns().length}
                        className=" text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <ScanSearch className="h-8 w-8" />
                          <p className="text-lg">No record found</p>
                          {globalFilter ? (
                            <p>
                              Your search &#34;
                              <span className="font-bold">{globalFilter}</span>
                              &#34; did not match any record in asd.
                              <br />
                              Please try again or create add a new{" "}
                              {globalFilter}.
                            </p>
                          ) : null}
                          <div className="flex gap-2">
                            {globalFilter ? (
                              <Button
                                variant="outline"
                                onClick={() => setGlobalFilter("")}
                              >
                                Clear Search
                              </Button>
                            ) : null}
                            <Button variant="outline" onClick={() => refetch()}>
                              Refresh
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={`skeleton-row-${index}`}>
                        {getAllColumns().map((col) => (
                          <TableCell
                            key={`skeleton-col-${col.id}`}
                            className="text-center"
                          >
                            <Skeleton className="h-10 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              );
            },
          }}
          fixedHeaderContent={() =>
            getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-white">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        renderColumnHeader(header),
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))
          }
          itemContent={(index, row) =>
            row
              .getVisibleCells()
              .map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))
          }
        />
      </div>
      <DataTablePagination {...tableProps} />
    </div>
  );
};

DataTable.CheckAll = CheckAll;
DataTable.RowActions = RowActions;
DataTable.ShowAction = ShowAction;
DataTable.EditAction = EditAction;
DataTable.DeleteAction = DeleteAction;
