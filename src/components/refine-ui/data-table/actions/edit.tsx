import {
  AccessControlContext,
  useCan,
  useNavigation,
  useResource,
  useTranslate,
} from "@refinedev/core";
import React, { useContext } from "react";

import { Edit } from "lucide-react";
import { RowAction } from ".";

export const EditAction: React.FC<any> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  accessControl,
  meta,
  onClick,
  ...rest
}) => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const { editUrl: generateEditUrl } = useNavigation();

  const translate = useTranslate();

  const { resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "edit",
    params: { id: recordItemId, resource },
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
    resource && recordItemId
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        generateEditUrl(resource, recordItemId!, meta)
      : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <RowAction
      disabled={data?.can === false}
      title={
        !data?.can
          ? editButtonDisabledTitle()
          : translate("buttons.edit", "Edit")
      }
      onClick={onClick}
      to={editUrl}
      icon={<Edit size={16} />}
      {...rest}
    />
  );
};
