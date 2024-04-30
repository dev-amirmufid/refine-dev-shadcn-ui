import React from "react";
import {
  useRefineContext,
  useResource,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";

import type { ListProps } from "../type";
import { PageHeader } from "../../page-header";
import { DeleteProvider } from "@/providers";
import { Breadcrumb } from "@/components/breadcrumb";
import { CreateButton } from "../../buttons";

export const List: React.FC<ListProps> = ({
  title,
  resource: resourceFromProps,
  breadcrumb: breadcrumbFromProps,
  createButtonProps,
  extra,
  children,
}) => {
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResource(resourceFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  return (
    <>
      <PageHeader
        title={
          title ??
          translate(
            `${identifier}.titles.List`,
            `List ${getUserFriendlyName(
              resource?.meta?.label ??
                resource?.options?.label ??
                resource?.label ??
                identifier,
              "plural"
            )}`
          )
        }
        breadcrumb={
          typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</> ?? undefined
          ) : (
            <Breadcrumb />
          )
        }
        extra={
          extra ?? (
            <>
              <div className="inline-flex flex-row gap-4">
                <CreateButton
                  {...createButtonProps}
                  resource={createButtonProps?.resource ?? identifier}
                />
              </div>
            </>
          )
        }
      />
      <DeleteProvider>
        <div className="relative pt-2 sm:pt-4 !mt-0">{children}</div>
      </DeleteProvider>
    </>
  );
};
