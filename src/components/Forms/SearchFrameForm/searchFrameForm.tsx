import { AtSign, Filter, Hash, Search, WholeWord } from "lucide-react";
import { Control, Input } from "../../ui/input";
import { DropDown } from "../../ui/DropDown";
import { Button } from "../../ui/button";
import { useSearchParams } from "react-router-dom";
import { FormEvent, useState } from "react";

export function SearchFrameForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  const [filter, setFilter] = useState(urlFilter)

  function handleFilter(event: FormEvent) {
    event.preventDefault()

    setSearchParams(params => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }


  return (
    
    <div>
      <form onSubmit={handleFilter} className="items-center gap-2 text-text-primary ">
          <Input variant='filter'>
            <Search className="size-3 text-text-primary" />
            <Control 
              className='placeholder:text-text-primary'
              placeholder="Search frames..." 
              onChange={e => setFilter(e.target.value)}
              value={filter}
            />
              <DropDown>
                <DropDown.Trigger className='place-self-end'>
                  <div className='bg-primary rounded-full w-4 h-4 items-center hover:bg-primary-hover transition-all focus:outline-none'>
                    <Button 
                      className='rounded-full text-text-primary'
                      type="submit"
                      variant='primary'>
                      <Filter className="size-3" />
                      Filters
                    </Button> 
                  </div>
                </DropDown.Trigger>
                <DropDown.Content className='p-1 mt-4 border border-border rounded-lg'>
                  <div className="p-2 bg-background flex flex-col gap-4">
                    <div className=''>
                    <section className="border-b-[1px] border-border text-center">
                      <div className="pb-2 gap-2">
                          <span className="text-text-primary">Select the filter</span>
                      </div>
                    </section>
                    <section className="p-1 space-y-2 space-x-2">
                      <Button
                        className='rounded-lg'
                        variant='primary'>
                          <WholeWord className='size-4'/>Frame Name</Button>
                      <Button 
                        className='rounded-lg'
                        variant='primary'>
                          <AtSign className='size-4'/>Frame Slug</Button>
                      <Button
                        className='rounded-lg'
                        variant='primary'>
                          <Hash className='size-4'/>Frame ID</Button>
                    </section>
                    </div>
                  </div>
                </DropDown.Content>
              </DropDown>   
          </Input>
        </form>
    </div>
  )
}