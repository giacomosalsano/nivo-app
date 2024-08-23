import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'inline-block py-1 px-2 rounded-full font-semibold text-[0.625rem]',

  variants: {
    variant: {
      ghost: 'bg-overlay text-text-primary cursor-default',
      primary: 'bg-primary text-text-primary cursor-default',
      secondary: 'bg-secondary text-secondary-foreground cursor-default'
    },
  },

  defaultVariants: {
    variant: 'ghost',
  },
})

interface BadgeProps
  extends ComponentProps<'span'>,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badge({ variant, className })} {...props} />
}