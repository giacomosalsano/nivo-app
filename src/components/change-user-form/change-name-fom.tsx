import { Check, Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button";
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const nameOfUserSchema = z.object({
  firstName: z.string().min(3, { message: 'Minimum 3 characters.' }),
  secondName: z.string().min(3, { message: 'Minimum 3 characters.' }),
  email: z.string().email({ message: 'Email is required.' })

})

type NameOfUserSchema = z.infer<typeof nameOfUserSchema>

function getUserNameFromString(input: string): string {
  return  input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export function ChangeNameForm() {
  const queryClient = useQueryClient()

  const { register, handleSubmit, watch, formState } = useForm<NameOfUserSchema>({
    resolver: zodResolver(nameOfUserSchema),
  })

  const userName = watch('firstName') 
    ? getUserNameFromString(watch('firstName')) + '_' + getUserNameFromString(watch('secondName'))
    : ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ firstName, secondName, email }: NameOfUserSchema) => {
      // delay 2s
      await new Promise(resolve => setTimeout(resolve, 2000))

      await fetch('http://localhost:5173/users', {
        method: 'PUT',
        body: JSON.stringify({
          firstName,
          secondName,
          userName,
          email,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags'],
      })
    }
  })

  async function changeName({ firstName, secondName, email }: NameOfUserSchema) {
    await mutateAsync({ firstName, secondName, email })
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
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change Second Name</label>
        <input 
          {...register('secondName')}
          id="name" 
          placeholder='Type here the new second name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.secondName && (
          <p className="text-sm text-error">{formState.errors.secondName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">Change Email</label>
        <input 
          {...register('email')}
          id="name" 
          placeholder='Type here the new email.'
          type="email" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.email && (
          <p className="text-sm text-error">{formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block" htmlFor="slug">User Name</label>
        <input 
          id="slug" 
          type="text"
          placeholder='This will be automatically filled in.' 
          readOnly 
          value={userName}
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