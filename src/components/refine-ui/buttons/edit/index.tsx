import {
  AccessControlContext,
  useCan,
  useLink,
  useNavigation,
  useResource,
  useTranslate,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import React, { useContext } from "react";

import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import type { EditButtonProps } from "../types";
import { Button } from "@/components/ui/button";

export const EditButton: React.FC<EditButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  hideText = false,
  accessControl,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const Link = useLink();
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { editUrl: generateEditUrl } = useNavigation();

  const { id, resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "edit",
    params: { id: recordItemId ?? id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const editButtonDisabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const editUrl =
    resource && (recordItemId ?? id)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        generateEditUrl(resource, recordItemId! ?? id!, meta)
      : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Button
      asChild
      disabled={data?.can === false}
      title={editButtonDisabledTitle()}
      data-testid={RefineButtonTestIds.EditButton}
      className={RefineButtonClassNames.EditButton}
      size={hideText ? "icon" : rest.size ?? "default"}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (data?.can === false) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...rest}
    >
      <Link to={editUrl} replace={false}>
        <Edit className={cn(!hideText ? "mr-2" : "")} size={16} />
        {!hideText && (children ?? translate("buttons.edit", "Edit"))}
      </Link>
    </Button>
  );
};
