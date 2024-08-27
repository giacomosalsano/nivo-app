import { useForm } from 'react-hook-form'
import { Check, Loader2, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../../ui/button";
import * as Dialog from '@radix-ui/react-dialog'
import { getFrameNameFromString } from '../../GetFrameNameFromString/getFrameNameFromString';
import { createFrame } from '../../../core/modules/frames/service/createFrame';
import { Frame } from '../../Interfaces/FrameInterface';
import { frameSchema } from '../../FrameSchema/frameSchema';

export function CreateFrameForm() {


  const { register, handleSubmit, watch, formState } = useForm<Frame>({
    resolver: zodResolver(frameSchema),
  })

  const frameNameSlug = watch('firstName') 
    ? getFrameNameFromString(watch('firstName')) + '_' + getFrameNameFromString(watch('lastName'))
    : ''

    const onSubmit = handleSubmit(async (data)=> {
      try {
        const frame = await createFrame(data)
        window.alert(
          'Your frame has been created successfully.',
        )
        setFrames( )
      }
      catch (error) {
        window.alert(
          'An error occurred while creating your frame. Please try again later.',
        )
      }
      
    })

  return (
    <form onSubmit={onSubmit} className="w-full space-y-6">

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">First Name</label>
        <input 
          {...register('firstName')}
          id="firstName" 
          placeholder='Type here the first name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.firstName && (
          <p className="text-sm text-error">{formState.errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Last Name</label>
        <input 
          {...register('lastName')}
          id="lastName" 
          placeholder='Type here the last name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.lastName && (
          <p className="text-sm text-error">{formState.errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">HTML Content</label>
        <input 
          {...register('htmlContent')}
          id="htmlContent" 
          placeholder='Type here the HTML Content.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.htmlContent && (
          <p className="text-sm text-error">{formState.errors.htmlContent.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block" htmlFor="slug">Frame Slug</label>
        <input 
        {...register('frameNameSlug')}
          id="frameNameSlug" 
          type="text"
          placeholder='This will be automatically filled in.' 
          readOnly 
          value={frameNameSlug}
          className="border border-border bg-foreground rounded-lg px-3 py-2 w-full text-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button variant='cancel' className='rounded-lg'>
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button 
          disabled={formState.isSubmitting}
          variant={formState.isSubmitting ? 'loading' : 'save'}
          className='rounded-lg'
          type="submit">
          {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
          {formState.isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}