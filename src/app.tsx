import { Header } from './components/ui/header'
import { Tabs } from './components/ui/TabsOptions'
import { SearchFrameForm } from './components/Forms/SearchFrameForm/searchFrameForm'
import { AddFramePortal } from './components/Portal/addFramePortal'
import { FramesTable } from './components/FramesTable/framesTable'
export function App() {
  
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
            <SearchFrameForm />
          </div>
          <AddFramePortal />
        </div>

        <FramesTable />
      </main>
    </div>
  )
}