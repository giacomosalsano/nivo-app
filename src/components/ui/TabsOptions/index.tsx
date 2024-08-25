import { Tags, Settings, Users } from 'lucide-react'

import { useState } from 'react'
import { tv } from 'tailwind-variants'
import { Tooltip } from '../Tooltip'

const optionTabButton = tv({
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
    filterOption: 'p-1 mt-4 border border-border rounded-lg',
  },
})


const optionTabButtons = [
  {
    title: { name: 'Frames', icon: <Tags className="size-4" /> },
    content: null,
  },
  {
    title: { name: 'Settings', icon: <Settings className="size-4" /> },
    content: null,
  },
  {
    title: { name: 'Share', icon: <Users className="size-4" /> },
    content: null,
    isDisabled: true,
  },
]
export function Tabs() {
  const [activeTabOption, setactiveTabOption] = useState<number>(1)

  const newOptionTabButton = optionTabButtons.map((option, index) => {
    return {
      ...option,
      id: index + 1,
    }
  })

  return (
    <div className='p-2 max-w-[1200px] mx-auto flex items-center justify-between'>
      <div className="flex items-center gap-2 max-w-[1200px] mx-auto">
        {newOptionTabButton.map((item) => (
          <button
            className={optionTabButton({
              isActive: item.id === activeTabOption,
              disabled: item.isDisabled,
            })}
            key={item.id}
            onClick={() => setactiveTabOption(item.id)}
            disabled={item.isDisabled}
          >
            {item.isDisabled?
    
            <Tooltip content={'This is yet to come...'}
            children={
              <div className="">
                <span className="max-w-20 truncate text-ellipsis">
                  <span className="flex items-center gap-2 ">
                    {item.title.icon} {item.title.name}
                  </span>
                </span>
              </div>
            }>
              
            </Tooltip>
            : <span className="flex items-center gap-2">
            {item.title.icon} {item.title.name}
          </span>}
            
          </button>
        ))}
      </div>
      <div className="flex items-center text-justify">
        {newOptionTabButton.find((optionTab) => optionTab.id === activeTabOption)?.content}
      </div>
    </div>
  )
}