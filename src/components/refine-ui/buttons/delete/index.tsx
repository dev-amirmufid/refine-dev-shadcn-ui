/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AccessControlContext,
  useCan,
  useResource,
  useTranslate,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import React, { useContext } from "react";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDeleteHelper } from "@/hooks";
import { DeleteContext } from "@/providers";
import type { DeleteButtonProps } from "../types";

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  onSuccess,
  mutationMode: mutationModeProp,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  metaData,
  meta,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  invalidates,
  ...rest
}) => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { can, reason } = useDeleteHelper(
    resourceNameFromProps as string,
    recordItemId as string
  );
  const deleteContext = useContext(DeleteContext);

  if (accessControlEnabled && hideIfUnauthorized && can) {
    return null;
  }

  return (
    <Button
      title={reason}
      disabled={can === false}
      data-testid={RefineButtonTestIds.DeleteButton}
      variant={"destructive"}
      className={RefineButtonClassNames.DeleteButton}
      size={hideText ? "icon" : rest.size ?? "default"}
      onClick={() => {
        deleteContext?.updateData({
          toogle: true,
          recordItemId,
          resource: resourceNameFromProps as string,
        });
      }}
      {...rest}
    >
      <Trash2 className={cn(!hideText ? "mr-2" : "")} size={16} />
      {!hideText && (children ?? translate("buttons.delete", "Delete"))}
    </Button>
  );
};

export const DeleteManyButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemIds,
  onSuccess,
  mutationMode: mutationModeProp,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  metaData,
  meta,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  invalidates,
  ...rest
}) => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "delete",
    queryOptions: {
      enabled: accessControlEnabled,
    },
    params: {
      resource,
    },
  });

  const deleteContext = useContext(DeleteContext);

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Button
      title={data?.reason}
      disabled={!data?.can}
      data-testid={RefineButtonTestIds.DeleteButton}
      variant={"destructive"}
      className={RefineButtonClassNames.DeleteButton}
      size={hideText ? "icon" : rest.size ?? "default"}
      onClick={() => {
        // deleteContext?.updateData({
        //   toggle: true,
        //   recordItemIds,
        //   resource: resourceNameFromProps as string,
        // });
      }}
      {...rest}
    >
      <Trash2 className={cn(!hideText ? "mr-2" : "")} size={16} />
      {!hideText &&
        (children ?? translate("buttons.delete_many", "Bulk Delete"))}
    </Button>
  );
};
