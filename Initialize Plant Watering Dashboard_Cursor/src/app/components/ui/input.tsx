import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex min-h-[var(--control-md)] w-full min-w-0 rounded-[var(--radius-md)] border-hairline border-[var(--border-default)] bg-[var(--input-background)] px-[var(--space-4)] py-[var(--space-3)] text-[var(--text-base)] text-[var(--fg-default)] transition-[background-color,border-color,box-shadow] duration-[var(--duration-fast)] outline-none",
        "placeholder:text-[var(--fg-muted)]",
        "hover:bg-[var(--white)] focus-visible:bg-[var(--white)] focus-visible:border-[var(--border-accent)] focus-visible:shadow-[var(--shadow-focus-ring)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--state-disabled-bg)] disabled:text-[var(--state-disabled-fg)]",
        "aria-invalid:border-thick aria-invalid:border-[var(--status-danger)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
