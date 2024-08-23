import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'disabled:bg-disabled inline-flex items-center gap-1.5 text-xs font-medium',

  variants: {
    variant: {
      default:
        'py-1.5 px-2.5 rounded-md bg-primary text-text-primary hover:bg-primary-hover ',
      primary:
        'py-1 px-2 rounded-full bg-primary text-text-primary hover:bg-primary-hover ',
      secondary:'py-1 px-2 rounded-full bg-secondary hover:bg-secondary-hover',
      tertiary: 'py-1 px-2 rounded-full bg-tertiary hover:bg-tertiary-hover text-text-secondary',
      cancel: 'py-1 px-2 rounded-full bg-error hover:bg-error-hover',
      save: 'py-1 px-2 rounded-full bg-success hover:bg-success-hover',
      loading: 'py-1 px-2 rounded-full bg-disabled text-text-disabled',
    },
    size: {
      default: '',
      icon: 'p-1.5',
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, size, className })} />
}