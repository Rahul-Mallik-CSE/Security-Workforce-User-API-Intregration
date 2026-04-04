/** @format */

import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        variant === "default"
          ? "border border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
          : variant === "secondary"
            ? "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            : variant === "destructive"
              ? "border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"
              : "border border-input"
      } ${className}`}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge };
