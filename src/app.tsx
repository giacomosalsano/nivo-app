import { Search, Filter, Loader2, UserPlus, Edit, Mail, AtSign, User } from 'lucide-react'
import { Header } from './components/ui/header'
import { Tabs } from './components/ui/TabsOptions'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/ui/pagination'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { DropDown } from './components/ui/DropDown'
import { CreateFrameForm } from './components/Forms/CreateFrameForm/createFrameForm'
import { Frames } from './components/FramesExamples/framesExamples'
import { FrameResponse } from './components/Interfaces/FrameResponseInterface'
import { UpdateFrameForm } from './components/Forms/UpdateFrameForm/updateFrameForm'
export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  
  const [filter, setFilter] = useState(urlFilter)


  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: namesResponse, isLoading, isFetching } = useQuery<FrameResponse>({
    queryKey: ['get-tags', urlFilter, page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`)
      const data = await response.json()

      return data
    },
    placeholderData: keepPreviousData,
  })

  function handleFilter(event: FormEvent) {
    event.preventDefault()

    setSearchParams(params => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="my-2 mx-2">
      <div>
        <Header />
      </div>
      <div className='mb-6 mt-2'>
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 align-middle block-inline">
            <h1 className="text-xl font-bold">All Frames</h1>
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
                              <User className='size-4'/>Frame Id</Button>
                          <Button
                            className='rounded-lg'
                            variant='primary'>
                              <Mail className='size-4'/>Frame Name</Button>
                          <Button 
                            className='rounded-lg'
                            variant='primary'>
                              <AtSign className='size-4'/>HTMLContent</Button>
                        </section>
                        </div>
                      </div>
                    </DropDown.Content>
                  </DropDown>   
              </Input>
            </form>
          </div>
          <div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button className='rounded-lg'>
                  <UserPlus className="size-3" />
                  Add Frame
                </Button> 
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-overlay" />
                <Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[400px] z-10 bg-background">
                  <div className="space-y-3">
                    <Dialog.Title className="text-xl font-bold">
                      Add Frame
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-text-primary">
                      Here you can add an frame.
                    </Dialog.Description>
                  </div>

                  <CreateFrameForm />
                  
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Frame ID</TableHead>
              <TableHead>Frame Name</TableHead>
              <TableHead>HTML Content</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          {Frames.map((frame)=> {
            return (
            <TableBody 
              key={frame.htmlContent}
              className='font-medium text-xs text-text-primary '>
              <TableRow>
                    <TableCell className='font-medium text-xs text-text-primary'>
                        {frame.name.firstName} {' '} {frame.name.lastName}
                  </TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>{frame.htmlContent}</TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>@{frame.frameNameSlug}</TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button 
                        className='rounded-full text-text-primary'
                        type="submit"
                        size='icon'
                        variant='primary'>
                        <Edit className="size-3" />
                      </Button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-overlay" />
                      <Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[400px] z-10 bg-background">
                        <div className="space-y-3">
                          <Dialog.Title className="text-xl font-bold">
                            Edit {frame.name.firstName} {frame.name.lastName}'s info
                          </Dialog.Title>
                          <Dialog.Description className="text-sm text-text-primary">
                            Here you can edit the frame {frame.frameNameSlug}.
                          </Dialog.Description>
                        </div>

                        <UpdateFrameForm />
                        
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                  </TableCell>
                  
                </TableRow>
            </TableBody>
            )
          })}
          

          <TableBody>
            {namesResponse?.data.map((frame) => {
              return (
                <TableRow key={frame.id}>
                  <div>
                    {isFetching && <Loader2 className="size-4 animate-spin text-disabled" />} 
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-xs text-text-primary">{frame.firstName} {frame.lastName}</span>
                        <span className="text-xs text-text-primary">{frame.frameNameSlug}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-primary">
                      {frame.htmlContent}
                    </TableCell>  
                  </div>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {namesResponse && <Pagination pages={namesResponse.pages} items={namesResponse.items} page={page} />}
      </main>
    </div>
  )
}