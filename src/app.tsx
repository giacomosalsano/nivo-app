import { Search, Filter, Loader2, UserPlus, Edit2Icon, Edit, UserCog, User, Mail, AtSign } from 'lucide-react'
import { Header } from './components/header'
import { Tabs } from './components/ui/TabsOptions'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/pagination'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { AddNameForm } from './components/add-user-form/add-name-fom'
import { Users } from './components/users/users'
import { ChangeNameForm } from './components/change-user-form/change-name-fom'
import { DropDown } from './components/ui/DropDown'

export interface UserResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: User[]
}

export interface User {
  firstName: string
  secondName: string
  userName: string
  email: string
  id: string
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  
  const [filter, setFilter] = useState(urlFilter)


  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: namesResponse, isLoading, isFetching } = useQuery<UserResponse>({
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
            <h1 className="text-xl font-bold">All Names</h1>
            <form onSubmit={handleFilter} className="items-center gap-2 text-text-primary ">
              <Input variant='filter'>
                <Search className="size-3 text-text-primary" />
                <Control 
                  className='placeholder:text-text-primary'
                  placeholder="Search names..." 
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
                              <User className='size-4'/>User</Button>
                          <Button
                            className='rounded-lg'
                            variant='primary'>
                              <Mail className='size-4'/>Email</Button>
                          <Button 
                            className='rounded-lg'
                            variant='primary'>
                              <AtSign className='size-4'/>username</Button>
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
                  Add User
                </Button> 
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-overlay" />
                <Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[400px] z-10 bg-background">
                  <div className="space-y-3">
                    <Dialog.Title className="text-xl font-bold">
                      Add User
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-text-primary">
                      Here you can add an user.
                    </Dialog.Description>
                  </div>

                  <AddNameForm />
                  
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Names</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>@username</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          {Users.map((user)=> {
            return (
            <TableBody 
              key={user.email}
              className='font-medium text-xs text-text-primary '>
              <TableRow>
                    <TableCell className='font-medium text-xs text-text-primary'>
                        {user.name.firstName} {' '} {user.name.secondName}
                  </TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>{user.email}</TableCell>
                  <TableCell className='font-medium text-xs text-text-primary'>@{user.userName}</TableCell>
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
                            Edit {user.name.firstName} {user.name.secondName}'s info
                          </Dialog.Title>
                          <Dialog.Description className="text-sm text-text-primary">
                            Here you can edit the user {user.userName}.
                          </Dialog.Description>
                        </div>

                        <ChangeNameForm />
                        
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                  </TableCell>
                  
                </TableRow>
            </TableBody>
            )
          })}
          

          <TableBody>
            {namesResponse?.data.map((user) => {
              return (
                <TableRow key={user.id}>
                  <div>
                    {isFetching && <Loader2 className="size-4 animate-spin text-disabled" />} 
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-xs text-text-primary">{user.firstName} {user.secondName}</span>
                        <span className="text-xs text-text-primary">{user.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-primary">
                      {user.email}
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