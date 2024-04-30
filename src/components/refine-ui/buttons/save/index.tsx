import { useTranslate } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import React from "react";

import { LoaderCircle, Save } from "lucide-react";
import type { SaveButtonProps } from "../types";
import { Button } from "@/components/ui/button";

export const SaveButton: React.FC<SaveButtonProps> = ({
  hideText = false,
  children,
  loading,
  ...rest
}) => {
  const translate = useTranslate();

  return (
    <Button
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      size={hideText ? "icon" : rest.size ?? "default"}
      {...rest}
    >
      {loading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Save className="mr-2" size={16} />
      )}
      {!hideText && (children ?? translate("buttons.save", "Save"))}
    </Button>
  );
};
