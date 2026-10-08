import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ring-1 ring-inset whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        blue: "bg-sky-50 text-sky-800 ring-sky-200",
        navy: "bg-navy-50 text-navy-800 ring-navy-200",
        amber: "bg-orange-50 text-orange-800 ring-orange-200",
        green: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        teal: "bg-teal-50 text-teal-800 ring-teal-200",
        violet: "bg-indigo-50 text-indigo-800 ring-indigo-200",
        gray: "bg-gray-100 text-gray-700 ring-gray-200",
        red: "bg-signal-50 text-signal-700 ring-signal-100",
        default: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "navy",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
