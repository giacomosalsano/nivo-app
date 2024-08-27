import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useContext } from 'react';
import { FramesContext } from '../../Contexts/ContexProviders/framesContextProvider';
import { UpdateFrameForm } from '../Forms/UpdateFrameForm/updateFrameForm';
import { Frame } from '../Interfaces/FrameInterface';
import { useNavigate } from 'react-router-dom';


export function EditFramePortal() {
  const { frames, selectedFrame, setSelectedFrame } = useContext(FramesContext);


  const handleSelectFrame = (frame: Frame) => {
    setSelectedFrame(frame);
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button 
            className='rounded-full text-text-primary'
            type="submit"
            size='icon'
            variant='primary'
            onClick={() =>  handleSelectFrame}>
            <Edit className="size-3" />
          </Button>
        </Dialog.Trigger>

        {selectedFrame && (
          <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-overlay" />

          <Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[400px] z-10 bg-background">
            <div className="space-y-3">
              <Dialog.Title className="text-xl font-bold">
                Edit {selectedFrame.firstName} {selectedFrame.lastName}'s info
              </Dialog.Title>
              
              <Dialog.Description className="text-sm text-text-primary">
                Here you can edit the frame @{selectedFrame.frameNameSlug}.
              </Dialog.Description>
            </div>

            <UpdateFrameForm frameToEdit={selectedFrame}/>
            
          </Dialog.Content> 
        </Dialog.Portal>
        )}
      </Dialog.Root>
    </div>
  )
}