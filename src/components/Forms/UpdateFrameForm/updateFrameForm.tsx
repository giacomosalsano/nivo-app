import { Check, Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../../ui/button'

const nameOfFrameSchema = z.object({
  firstName: z.string().min(3, { message: 'Minimum 3 characters.' }),
  lastName: z.string().min(3, { message: 'Minimum 3 characters.' }),
  htmlContent: z.string().min(3, { message: 'This field is required.' })

})

type NameOfFrameSchema = z.infer<typeof nameOfFrameSchema>

function getFrameNameFromString(input: string): string {
  return  input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export function UpdateFrameForm() {
  const queryClient = useQueryClient()

  const { register, handleSubmit, watch, formState } = useForm<NameOfFrameSchema>({
    resolver: zodResolver(nameOfFrameSchema),
  })

  const frameNameSlug = watch('firstName') 
    ? getFrameNameFromString(watch('firstName')) + '_' + getFrameNameFromString(watch('lastName'))
    : ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ firstName, lastName, htmlContent }: NameOfFrameSchema) => {
      // delay 2s
      await new Promise(resolve => setTimeout(resolve, 2000))

      await fetch('http://localhost:5173/frames', {
        method: 'PUT',
        body: JSON.stringify({
          firstName,
          lastName,
          frameNameSlug,
          htmlContent,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags'],
      })
    }
  })

  async function changeName({ firstName, lastName, htmlContent }: NameOfFrameSchema) {
    await mutateAsync({ firstName, lastName, htmlContent })
  }

  return (
    <form onSubmit={handleSubmit(changeName)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change First Name</label>
        <input 
          {...register('firstName')}
          id="name" 
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
          id="name" 
          placeholder='Type here the new last name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.lastName && (
          <p className="text-sm text-error">{formState.errors.lastName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change Email</label>
        <input 
          {...register('htmlContent')}
          id="name" 
          placeholder='Type here the new HTMLContent.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.htmlContent && (
          <p className="text-sm text-error">{formState.errors.htmlContent.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block" htmlFor="slug">Frame Name</label>
        <input 
          id="slug" 
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