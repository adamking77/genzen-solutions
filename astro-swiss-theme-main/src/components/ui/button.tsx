import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 hover:scale-105 hover:shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-gradient-to-r hover:from-destructive hover:to-destructive/80 hover:scale-105 hover:shadow-lg",
        outline:
          "border border-input bg-background hover:bg-gradient-to-r hover:from-background hover:to-accent/30 dark:hover:from-[hsl(var(--background))] dark:hover:to-[hsl(var(--background-elevated))] hover:border-accent dark:hover:border-[hsl(var(--accent-bright))] hover:scale-105 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-[hsl(var(--shadow-soft))]/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/70 hover:scale-105 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-[hsl(var(--shadow-soft))]/35",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
        // Enhanced pill variants with Swiss design principles
        pill: "border-2 border-foreground/30 bg-background text-foreground font-light hover:bg-gradient-to-r hover:from-background hover:to-accent/30 dark:hover:from-[hsl(var(--background))] dark:hover:to-[hsl(var(--background-elevated))] hover:border-accent dark:hover:border-[hsl(var(--accent-bright))] hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-[hsl(var(--shadow-soft))]/45 hover:scale-105 rounded-full tracking-wide",
        "pill-primary": "border-2 border-primary bg-primary text-primary-foreground font-light hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 dark:hover:from-primary dark:hover:to-primary/90 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-[hsl(var(--shadow-medium))]/35 hover:scale-105 rounded-full tracking-wide",
        "pill-ghost": "border-2 border-transparent bg-transparent text-foreground font-light hover:bg-gradient-to-r hover:from-transparent hover:to-accent/30 dark:hover:from-transparent dark:hover:to-[hsl(var(--background-elevated))]/50 hover:border-accent dark:hover:border-[hsl(var(--accent-bright))] hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-[hsl(var(--shadow-soft))]/40 hover:scale-105 rounded-full tracking-wide",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
        // Pill-specific sizes
        "pill-sm": "h-8 px-4 py-1.5 text-xs",
        "pill-default": "h-10 px-6 py-2.5 text-sm",
        "pill-lg": "h-12 px-8 py-3 text-base",
        "pill-xl": "h-14 px-10 py-3.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "pill" | "pill-primary" | "pill-ghost" | null;
  size?: "default" | "sm" | "lg" | "xl" | "icon" | "pill-sm" | "pill-default" | "pill-lg" | "pill-xl" | null;
  withSwissAccent?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, withSwissAccent = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isPillVariant = variant?.includes('pill')
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          // Add group class for Swiss accent functionality
          withSwissAccent && "group",
          // Add Swiss button enhancements
          isPillVariant && "pill-button-glow",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }