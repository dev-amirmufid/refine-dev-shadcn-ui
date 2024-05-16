import {
  AccessControlContext,
  useCan,
  useNavigation,
  useResource,
  useTranslate,
} from "@refinedev/core";
import React, { useContext } from "react";

import { EyeIcon } from "lucide-react";
import { RowAction } from ".";

export const ShowAction: React.FC<any> = ({
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

  const { showUrl: generateShowUrl } = useNavigation();

  const translate = useTranslate();

  const { resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "show",
    params: { id: recordItemId, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const showButtonDisabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const showUrl =
    resource && recordItemId
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        generateShowUrl(resource, recordItemId!, meta)
      : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <RowAction
      disabled={data?.can === false}
      title={
        !data?.can
          ? showButtonDisabledTitle()
          : translate("buttons.show", "Show")
      }
      onClick={onClick}
      to={showUrl}
      icon={<EyeIcon size={16} />}
      {...rest}
    />
  );
};
