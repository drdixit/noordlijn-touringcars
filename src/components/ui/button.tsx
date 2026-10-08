import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-signal-500 text-white hover:bg-signal-600 active:bg-signal-700",
        secondary: "bg-navy-900 text-white hover:bg-navy-800",
        outline: "border border-navy-200 bg-white text-navy-900 hover:border-navy-400 hover:bg-navy-50",
        ghost: "text-navy-800 hover:bg-navy-50",
        white: "bg-white text-navy-900 hover:bg-navy-50",
        danger: "bg-white border-signal-100 text-signal-600 hover:bg-signal-50 border",
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-base",
        default: "h-11 px-5 text-[15px]",
        icon: "size-8",
        "icon-sm": "size-7 rounded-md",
        "icon-xs": "size-6 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
