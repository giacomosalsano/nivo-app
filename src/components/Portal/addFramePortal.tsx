import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { CreateFrameForm } from "../Forms/CreateFrameForm/createFrameForm";

export function AddFramePortal() {
  
  return (
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
                Here you can add a frame.
              </Dialog.Description>
            </div>

            <CreateFrameForm />
            
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}