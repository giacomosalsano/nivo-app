type Title = {
  name: string
  icon?: React.ReactNode
}

type Tab = {
  title: Title
  content: React.ReactNode
  isDisabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
}