import { Check, Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../../ui/button'
import { updateFrame } from '../../../core/modules/frames/service/updateFrame'
import { frameSchema } from '../../FrameSchema/frameSchema'
import { Frame } from '../../Interfaces/FrameInterface'
import { getFrameNameFromString } from '../../GetFrameNameFromString/getFrameNameFromString'




export function UpdateFrameForm() {
  const { } = frame

  const { register, handleSubmit, watch, formState } = useForm<Frame>({
    resolver: zodResolver(frameSchema),
    defaultValues: {firstName: frame.firstName}
  })

  const frameNameSlug = watch('firstName') 
    ? getFrameNameFromString(watch('firstName')) + '_' + getFrameNameFromString(watch('lastName'))
    : ''

    const onSubmit = handleSubmit(async (data)=> {
      try {
        await updateFrame(data)
        window.alert(
          'Your frame has been updated successfully.',
        )
      }
      catch (error) {
        window.alert(
          'An error occurred while updating your frame. Please try again later.',
        )
      }
      
    })


  return (
    <form onSubmit={onSubmit} className="w-full space-y-6">

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change First Name</label>
        <input 
          {...register('firstName')}
          id="firstName" 
          placeholder='Type here the new first name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.firstName && (
          <p className="text-sm text-error">{formState.errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change Last Name</label>
        <input 
          {...register('lastName')}
          id="lastName" 
          placeholder='Type here the new last name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.lastName && (
          <p className="text-sm text-error">{formState.errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change HTML Content</label>
        <input 
          {...register('htmlContent')}
          id="htmlContent" 
          placeholder='Type here the new HTML Content.'
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