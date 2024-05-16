import {
  RefineCreateButtonProps,
  RefineDeleteButtonProps,
  RefineEditButtonProps,
  RefineListButtonProps,
  RefineSaveButtonProps,
  RefineShowButtonProps,
} from "@refinedev/ui-types";
import { ButtonProps } from "@/ui/button";
import { BaseKey } from "@refinedev/core";

export type ShowButtonProps = RefineShowButtonProps<ButtonProps>;

export type CreateButtonProps = RefineCreateButtonProps<ButtonProps>;

export type DeleteButtonProps = RefineDeleteButtonProps<ButtonProps>;

export type DeleteManyButtonProps = Omit<
  RefineDeleteButtonProps<ButtonProps>,
  "recordItemId"
> & {
  recordItemIds: BaseKey[];
};

export type EditButtonProps = RefineEditButtonProps<ButtonProps>;

export type ListButtonProps = RefineListButtonProps<ButtonProps>;

export type SaveButtonProps = RefineSaveButtonProps<ButtonProps> & {
  loading?: boolean;
};

interface DeleteManyButtonProps {
  resource: string;
  ids: string[];
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}
