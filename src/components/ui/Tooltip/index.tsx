import React from 'react'

import * as BaseTooltip from '@radix-ui/react-tooltip'

interface TooltipProps {
  children: React.ReactNode
  content: string | JSX.Element
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <BaseTooltip.Provider delayDuration={100}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger>{children}</BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Content className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-lg bg-background px-2 py-1 text-xs leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] border border-5 border-primary will-change-[transform,opacity]">
            <span className="text-xs text-text-primary font-bold">{content}</span>
            <BaseTooltip.Arrow className="m-1 fill-primary" />
          </BaseTooltip.Content>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  )
}
