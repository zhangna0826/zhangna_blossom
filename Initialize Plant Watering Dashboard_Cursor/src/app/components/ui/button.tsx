import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-sm font-medium tracking-wide transition-[background-color,color,border-color] duration-[var(--duration-fast)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--state-disabled-bg)] disabled:text-[var(--state-disabled-fg)] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:shadow-[var(--shadow-focus-ring)] active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)]",
        destructive:
          "bg-destructive text-[var(--fg-on-accent)] hover:bg-[var(--green-900)] active:bg-[var(--green-900)]",
        outline:
          "border-hairline border-[var(--border-strong)] bg-transparent text-[var(--fg-default)] hover:bg-[var(--white)] active:bg-[var(--bg-surface-alt)]",
        secondary:
          "bg-[var(--bg-surface-alt)] text-[var(--fg-default)] border-hairline border-[var(--border-default)] hover:bg-[var(--white)] active:bg-[var(--accent-subtle)]",
        ghost:
          "text-[var(--green-600)] hover:bg-[var(--white)] active:bg-[var(--bg-surface-alt)]",
        link: "text-[var(--link)] underline-offset-4 hover:underline hover:text-[var(--link-hover)]",
      },
      size: {
        default: "min-h-[var(--control-md)] px-[var(--space-5)] py-[var(--space-3)] has-[>svg]:px-[var(--space-4)]",
        sm: "min-h-[var(--control-md)] gap-1.5 px-[var(--space-4)] py-[var(--space-2)] text-sm has-[>svg]:px-[var(--space-3)]",
        lg: "min-h-[var(--control-md)] px-[var(--space-6)] py-[var(--space-3)] has-[>svg]:px-[var(--space-5)]",
        icon: "size-[var(--control-md)] rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
