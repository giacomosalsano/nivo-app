import { ListVideo, Tags, Settings, Code2 } from 'lucide-react'

import { useState } from 'react'
import { tv } from 'tailwind-variants'
import { TabsProps } from './types'

const tabButton = tv({
  base: 'py-1.5 gap-1.5  px-3 inline-flex items-center text-sm font-medium rounded-full border-2 border-transparent',
  variants: {
    isActive: {
      true: 'text-primary cursor-pointer font-bold justify-center items-center border-b-primary',
      false:
        'text-tertiary hover:text-tertiary-hover hover:border-b-tertiary-hover cursor-pointer font-medium justify-center items-center border-b-tertiary',
    },
    disabled: {
      true: 'text-text-disabled cursor-not-allowed font-medium justify-center items-center  border-b-text-disabled hover:text-text-disabled hover:border-b-text-disabled',
      false: null,
    },
  },
})


const tabs = [
  {
    title: { name: 'Uploads', icon: <ListVideo className="size-4" />
    },
    content: null,
  },
  {
    title: { name: 'Names', icon: <Tags className="size-4" /> },
    content: null,
  },
  {
    title: { name: 'Settings', icon: <Settings className="size-4" /> },
    content: null,
  },
  {
    title: { name: 'Developers', icon: <Code2 className="size-4" /> },
    content: null,
    isDisabled: true,
  },
]
export function Tabs() {
  const [activeTab, setActiveTab] = useState<number>(1)

const newTabs = tabs.map((tab, index) => {
  return {
    ...tab,
    id: index + 1,
  }
})

  return (
    <div className='p-2 max-w-[1200px] mx-auto flex items-center justify-between'>
      <div className="flex items-center gap-2 max-w-[1200px] mx-auto">
        {newTabs.map((item) => (
          <button
            className={tabButton({
              isActive: item.id === activeTab,
              disabled: item.isDisabled,
            })}
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            disabled={item.isDisabled}
          >
            <span className="flex items-center gap-2">
              {item.title.icon} {item.title.name}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center text-justify">
        {newTabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}