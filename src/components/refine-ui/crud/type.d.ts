import type { PageHeaderProps } from "@/components/refine-ui/page-header/type";
import type { CreateButtonProps } from "@/components/refine-ui/buttons/types";
import type {
  RefineCrudCreateProps,
  RefineCrudEditProps,
  RefineCrudListProps,
  RefineCrudShowProps,
} from "@refinedev/ui-types";

export type CreateProps = RefineCrudCreateProps<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps
> &
  Partial<{
    extra: React.ReactNode;
  }>;

export type EditProps = RefineCrudEditProps<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps
> &
  Partial<{
    extra: React.ReactNode;
  }>;

export type ListProps = Omit<
  RefineCrudListProps<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    PageHeaderProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >,
  "createButtonProps"
> &
  Partial<{
    createButtonProps: CreateButtonProps;
    extra: React.ReactNode;
  }>;

export type ShowProps = RefineCrudShowProps<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps
> &
  Partial<{
    extra: React.ReactNode;
  }>;
