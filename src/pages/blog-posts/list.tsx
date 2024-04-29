import { Button } from "@/components/ui/button";
import { type GetManyResponse, useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

export const BlogPostList = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id == getValue<any>()?.id
            );

            return category?.title ?? "Loading...";
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleString(undefined, {
            timeZone: "UTC",
          });
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <button
                onClick={() => {
                  show("blog_posts", getValue() as string);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  edit("blog_posts", getValue() as string);
                }}
              >
                Edit
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { edit, show, create } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      tableQueryResult: { data: tableData },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable({
    columns,
  });

  const { data: categoryData } = useMany({
    resource: "categories",
    ids:
      tableData?.data?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
};

// <div style={{ padding: "16px" }}>
//   <div
//     style={{
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//     }}
//   >
//     <h1>{"List"}</h1>
//     <button onClick={() => create("blog_posts")}>{"Create"}</button>
//   </div>
//   <div style={{ maxWidth: "100%", overflowY: "scroll" }}>
//     <table>
//       <thead>
//         {getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => (
//               <th key={header.id}>
//                 {!header.isPlaceholder &&
//                   flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody>
//         {getRowModel().rows.map((row) => (
//           <tr key={row.id}>
//             {row.getVisibleCells().map((cell) => (
//               <td key={cell.id}>
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   <div style={{ marginTop: "12px" }}>
//     <button
//       onClick={() => setPageIndex(0)}
//       disabled={!getCanPreviousPage()}
//     >
//       {"<<"}
//     </button>
//     <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
//       {"<"}
//     </button>
//     <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
//       {">"}
//     </button>
//     <button
//       onClick={() => setPageIndex(getPageCount() - 1)}
//       disabled={!getCanNextPage()}
//     >
//       {">>"}
//     </button>
//     <span>
//       <strong>
//         {" "}
//         {getState().pagination.pageIndex + 1} / {getPageCount()}{" "}
//       </strong>
//     </span>
//     <span>
//       | {"Go"}:{" "}
//       <input
//         type="number"
//         defaultValue={getState().pagination.pageIndex + 1}
//         onChange={(e) => {
//           const page = e.target.value ? Number(e.target.value) - 1 : 0;
//           setPageIndex(page);
//         }}
//       />
//     </span>{" "}
//     <select
//       value={getState().pagination.pageSize}
//       onChange={(e) => {
//         setPageSize(Number(e.target.value));
//       }}
//     >
//       {[10, 20, 30, 40, 50].map((pageSize) => (
//         <option key={pageSize} value={pageSize}>
//           {"Show"} {pageSize}
//         </option>
//       ))}
//     </select>
//   </div>
// </div>
