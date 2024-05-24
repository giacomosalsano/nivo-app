import { Plus, Search, FileDown, MoreHorizontal } from 'lucide-react'
import { Header } from './components/header'
import { Button } from './components/ui/button'
import { Tabs } from './components/tabs'
import { Input, Control } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from './components/ui/table'
import { Pagination } from './components/pagination'
import { useQuery } from '@tanstack/react-query'

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
  amountOfViews: number
  id: string
}
export function App() {
  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags'],
    queryFn: async () => {
      const response = await fetch('http://localhost:333/tags?_pages=1&-per-page=10')
      const data = await response.json()


      return data
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }





  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant='primary'>
            <Plus className="size-3"/>
            Create New
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Input variant='filter'>
            <Search className="size-3"/>
            <Control placeholder="Search for tags..."/>
          </Input>

          <Button>
            <FileDown className="size-3"/>
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of Videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.title}</span>
                      <span className="text-xs text-zinc-500">{tag.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.amountOfViews} video(s)
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {tagsResponse && <Pagination 
        pages={tagsResponse.pages} 
        items={tagsResponse.items} 
        page={1} />}
        
      </main>
    </div>
  )
}


