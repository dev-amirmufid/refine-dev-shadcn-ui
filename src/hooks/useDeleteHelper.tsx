import type { CanReturnType } from "@refinedev/core";
import {
  AccessControlContext,
  pickNotDeprecated,
  useCan,
  useDelete,
  useMutationMode,
  useResource,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import { useContext } from "react";

type DeleteHelperReturnType = CanReturnType & {
  isLoading: boolean;
  mutate: (e?: any) => any; // TODO: UseDeleteReturnType fix
};

export const useDeleteHelper = (
  resource: string,
  recordItemId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any
): DeleteHelperReturnType => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { id, resource: _resource, identifier } = useResource(resource);

  const { mutationMode } = useMutationMode();

  const { mutate, isLoading } = useDelete();

  const { data } = useCan({
    resource: _resource?.name,
    action: "delete",
    params: { id: recordItemId ?? id, resource: _resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const reason = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const { setWarnWhen } = useWarnAboutChange();

  const onDeleteMutate = (options?: any): any => {
    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
      return;
    }
    if ((recordItemId ?? id) && identifier) {
      setWarnWhen(false);
      return mutate(
        {
          id: recordItemId ?? id ?? "",
          resource: identifier,
          mutationMode,
          // TODO: NotificationProvider
          // successNotification,
          // TODO: NotificationProvider
          // errorNotification,
          meta: pickNotDeprecated(meta),
          metaData: pickNotDeprecated(meta),
        },
        options
      );
    }

    return undefined;
  };

  return {
    can: !(accessControlEnabled && hideIfUnauthorized && !data?.can),
    reason: reason(),
    mutate: onDeleteMutate,
    isLoading,
  };
};
