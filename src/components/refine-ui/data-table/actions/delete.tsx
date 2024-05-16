import React, { useContext } from "react";
import {
  AccessControlContext,
  useCan,
  useDelete,
  useResource,
  useTranslate,
} from "@refinedev/core";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RowAction } from ".";
import { Trash, TriangleAlert } from "lucide-react";
import { DeleteContext, DeleteContextType } from "@/providers";
import { Button } from "@/components/ui/button";

export const DeleteActionModal: React.FC<DeleteContextType> = (props) => {
  const translate = useTranslate();
  const { mutate: deleteRecord } = useDelete();

  const closeModal = () => {
    props.updateData({
      toogle: false,
      recordItemId: undefined,
      resource: undefined,
    });
  };

  const handleDelete = () => {
    if (!props.data.recordItemId) return null;
    deleteRecord(
      { id: props.data.recordItemId, resource: props.data.resource ?? "" },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <AlertDialog open={props?.data?.toogle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="inline-flex items-center gap-2">
            <TriangleAlert />
            {translate("actions.delete.title", "Are you sure absolutely sure?")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {translate(
              "actions.delete.title",
              "If this action can be undone later, this data will be temporarily deleted."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash size={16} className="mr-2" /> Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteAction: React.FC<any> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  accessControl,
  // meta,
  onClick,
  ...rest
}) => {
  const deleteContext = useContext(DeleteContext);
  const translate = useTranslate();
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const { resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName
  );
  const { data } = useCan({
    resource: resource?.name,
    action: "delete",
    params: { id: recordItemId, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const deleteButtonDisabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <RowAction
      disabled={data?.can === false}
      title={
        !data?.can
          ? deleteButtonDisabledTitle()
          : translate("buttons.delete", "Delete")
      }
      onClick={
        onClick ||
        (() =>
          deleteContext?.updateData({
            recordItemId,
            toogle: true,
          }))
      }
      icon={<Trash size={16} />}
      className="text-red-500 hover:text-red-500"
      {...rest}
    />
  );
};
