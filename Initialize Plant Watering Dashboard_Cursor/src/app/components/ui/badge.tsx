import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-pill border-hairline px-[var(--space-3)] py-[var(--space-1)] text-sm font-medium tracking-wide w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-[var(--space-2)] [&>svg]:pointer-events-none focus-visible:shadow-[var(--shadow-focus-ring)] transition-[background-color,color,border-color] duration-[var(--duration-fast)] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent-subtle)] text-[var(--green-800)]",
        secondary:
          "border-transparent bg-[var(--bg-surface-alt)] text-[var(--fg-default)]",
        destructive:
          "border-transparent bg-[var(--status-danger-bg)] text-[var(--status-danger)]",
        outline:
          "border-[var(--border-default)] bg-transparent text-[var(--fg-default)]",
        clay:
          "border-transparent bg-[var(--clay-bg)] text-[var(--clay-fg)]",
        sky:
          "border-transparent bg-[var(--sky-bg)] text-[var(--sky-fg)]",
        sunshine:
          "border-transparent bg-[var(--sunshine-bg)] text-[var(--sunshine-fg)]",
        subtle:
          "border-transparent bg-[var(--accent-subtle)] text-[var(--green-800)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
