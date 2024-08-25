export interface NameResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: FrameInterface[]
}

export interface FrameInterface {
  firstName: string
  lastName: string
  frameNameSlug: string
  htmlContent: string
  id: string
}