import { ComponentProps, createContext, ReactNode, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  slots: {
    root: 'border border-border hover:border-border-hover',
    control: 'placeholder-tertiary ',
  },

  variants: {
    variant: {
      default: {},
      filter: {
        root: 'rounded-full py-1.5 px-3 flex items-center gap-1.5 text-xs text-text-primary hover:border-primary leading-tight border-dashed border-border focus-within:border-primary focus-within:text-text-primary ',
        control: 'bg-transparent flex-1 outline-none',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const inputContext = createContext({} as VariantProps<typeof input>)

export function Input({
  children,
  variant,
}: { children: ReactNode } & VariantProps<typeof input>) {
  const { root } = input({ variant })

  return (
    <inputContext.Provider value={{ variant }}>
      <div className={root()}>{children}</div>
    </inputContext.Provider>
  )
}

export interface ControlProps extends ComponentProps<'input'> {}

export function Control({ className, ...props }: ControlProps) {
  const { variant } = useContext(inputContext)
  const { control } = input({ variant })

  return <input className={control({ className })} {...props} />
}