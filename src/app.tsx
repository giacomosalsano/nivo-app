import { Header } from './components/ui/header'
import { Tabs } from './components/ui/TabsOptions'
import { SearchFrameForm } from './components/Forms/SearchFrameForm/searchFrameForm'
import { AddFramePortal } from './components/Portal/addFramePortal'
import { FramesTable } from './components/FramesTable/framesTable'
import { FramesContextProvider } from './Contexts/ContexProviders/framesContextProvider'
export function App() {


  return (
      <main className="max-w-6xl space-y-5 my-2 mx-2">
        <FramesContextProvider>
          <div>
            <Header />
          </div>
          <div className='mb-6 mt-2'>
            <Tabs />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 align-middle">
              <h1 className="text-xl font-bold">All Frames</h1>
              <SearchFrameForm />
            </div>
            <AddFramePortal />
          </div>
          <FramesTable />
        </FramesContextProvider>
      </main>
  )
}