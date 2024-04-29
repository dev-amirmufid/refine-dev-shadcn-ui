import {
  RefineCreateButtonProps,
  RefineDeleteButtonProps,
  RefineEditButtonProps,
  RefineListButtonProps,
  RefineSaveButtonProps,
  RefineShowButtonProps,
} from "@refinedev/ui-types";
import { ButtonProps } from "@/ui/button";

export type ShowButtonProps = RefineShowButtonProps<ButtonProps>;

export type CreateButtonProps = RefineCreateButtonProps<ButtonProps>;

export type DeleteButtonProps = RefineDeleteButtonProps<ButtonProps>;

export type EditButtonProps = RefineEditButtonProps<ButtonProps>;

export type ListButtonProps = RefineListButtonProps<ButtonProps>;

export type SaveButtonProps = RefineSaveButtonProps<ButtonProps> & {
  loading?: boolean;
};
