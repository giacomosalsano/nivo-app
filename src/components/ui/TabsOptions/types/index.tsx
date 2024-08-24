type Title = {
  name: string
  icon?: React.ReactNode
}

type TabOption = {
  title: Title
  content: React.ReactNode
  isDisabled?: boolean
}

export interface TabOptionsProps {
  tabs: TabOption[]
}