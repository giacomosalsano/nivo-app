import { Frame } from "./FrameInterface"

export interface FrameResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Frame[]
}