import { z } from "zod";

export const nameOfFrameSchema = z.object({
  firstName: z.string().min(3, { message: 'Minimum 3 characters.' }),
  lastName: z.string().min(3, { message: 'Minimum 3 characters.' }),
  frameNameSlug: z.string(),
  htmlContent: z.string().min(3, { message: 'This field is required.' })

})

export type NameOfFrameSchema = z.infer<typeof nameOfFrameSchema>
