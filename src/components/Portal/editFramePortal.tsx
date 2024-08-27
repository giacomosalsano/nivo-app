import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { UpdateFrameForm } from '../Forms/UpdateFrameForm/updateFrameForm';


export function EditFramePortal() {
  return (
    <div>
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
    </div>
  )
}