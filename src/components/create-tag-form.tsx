import { Check, Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button";
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const nameOfProductSchema = z.object({
  title: z.string().min(3, { message: 'Minimum 3 characters.' }),
})

type NameOfProductSchema = z.infer<typeof nameOfProductSchema>

function getSlugFromString(input: string): string {
  return  input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export function CreateTagForm() {
  const queryClient = useQueryClient()

  const { register, handleSubmit, watch, formState } = useForm<NameOfProductSchema>({
    resolver: zodResolver(nameOfProductSchema),
  })

  const slug = watch('title') 
    ? getSlugFromString(watch('title')) 
    : ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ title }: NameOfProductSchema) => {
      // delay 2s
      await new Promise(resolve => setTimeout(resolve, 2000))

      await fetch('http://localhost:5173/tags', {
        method: 'POST',
        body: JSON.stringify({
          title,
          slug,
          amountOfVideos: 0,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags'],
      })
    }
  })

  async function createName({ title }: NameOfProductSchema) {
    await mutateAsync({ title })
  }

  return (
    <form onSubmit={handleSubmit(createName)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block " htmlFor="title">New Name</label>
        <input 
          {...register('title')}
          id="name" 
          placeholder='Type here the new name.'
          type="text" 
          className="border border-border hover:border-border-hover bg-foreground rounded-lg px-3 py-2 w-full text-sm focus:outline-primary focus:border-none"
        />
        {formState.errors?.title && (
          <p className="text-sm text-error">{formState.errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary block" htmlFor="slug">Slug</label>
        <input 
          id="slug" 
          type="text"
          placeholder='This will be automatically filled in.' 
          readOnly 
          value={slug}
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