import { Plus, Search, Filter, FileDown, Loader2 } from 'lucide-react'
import { Header } from './components/header'
import { Tabs } from './components/ui/Tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/pagination'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { CreateTagForm } from './components/create-tag-form'

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  
  const [filter, setFilter] = useState(urlFilter)


  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: tagsResponse, isLoading, isFetching } = useQuery<TagResponse>({
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
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">All Names</h1>
            <form onSubmit={handleFilter} className="flex items-center gap-2 text-text-primary">
              <Input variant='filter'>
                <Search className="size-3 text-text-primary" />
                <Control 
                  className='placeholder:text-text-primary'
                  placeholder="Search names..." 
                  onChange={e => setFilter(e.target.value)}
                  value={filter}
                />
                <Button 
                  className='rounded-full text-text-primary'
                  type="submit"
                  variant='primary'>
                  <Filter className="size-3" />
                  Filters
                </Button> 
              </Input>
            </form>
          </div>
          <Button className='rounded-lg'>
            <FileDown className="size-3" />
            Export
          </Button> 
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Names</TableHead>
              <TableHead>Amount of Names</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <div>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-xs text-text-primary">Nome 1</span>
                        <span className="text-xs text-text-primary">nome-1</span>
                      </div>
                    </TableCell>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Button variant='primary'>
                          <Plus className="size-3" />
                          Change Name
                        </Button>
                      </Dialog.Trigger>

                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
                        <Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-background">
                          <div className="space-y-3">
                            <Dialog.Title className="text-xl font-bold">
                              Change Name
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-text-primary">
                              Here you can change name of this field.
                            </Dialog.Description>
                          </div>

                          <CreateTagForm />
                          
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>

                    {isFetching && <Loader2 className="size-4 animate-spin text-zinc-500" />}   
                  </div>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-xs text-text-primary">{tag.title}</span>
                      <span className="text-xs text-text-primary">{tag.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-primary">
                    {tag.amountOfVideos} video(s)
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {tagsResponse && <Pagination pages={tagsResponse.pages} items={tagsResponse.items} page={page} />}
      </main>
    </div>
  )
}