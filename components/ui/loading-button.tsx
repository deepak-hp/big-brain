import React, { ReactNode } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export function LoadingButton({
  isLoading,
  children,
  loadingText,
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
}) {
  return (
    <Button
      className="flex gap-2 items-center"
      type="submit"
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
