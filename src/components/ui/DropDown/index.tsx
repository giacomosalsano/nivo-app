import React, { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'


interface DropDownProps {
  children: ReactNode
}

interface DropDownComponent extends React.FC<DropDownProps> {
  Trigger: typeof DropdownMenu.Trigger
  Content: typeof DropdownMenu.Content
  Item: typeof DropdownMenu.Item
}

export const DropDown: DropDownComponent = ({ children }) => {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}

DropDown.Trigger = DropdownMenu.Trigger
DropDown.Content = DropdownMenu.Content
DropDown.Item = DropdownMenu.Item
