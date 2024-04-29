import {
  AccessControlContext,
  useCan,
  useLink,
  useNavigation,
  useResource,
  useTranslate,
} from "@refinedev/core";
import { useContext } from "react";

import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CreateButtonProps } from "../type";

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
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

  const { createUrl: generateCreateUrl } = useNavigation();

  const { resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "create",
    queryOptions: {
      enabled: accessControlEnabled,
    },
    params: {
      resource,
    },
  });

  const createButtonDisabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const createUrl = resource ? generateCreateUrl(resource, meta) : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Button
      asChild
      disabled={data?.can === false}
      data-testid={RefineButtonTestIds.CreateButton}
      className={RefineButtonClassNames.CreateButton}
      {...rest}
    >
      <Link
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
        to={createUrl}
        replace={false}
        title={createButtonDisabledTitle()}
      >
        <PlusSquare className={cn(!hideText ? "mr-2" : "")} size={16} />
        {!hideText && (children ?? translate("buttons.create", "Create"))}
      </Link>
    </Button>
  );
};
