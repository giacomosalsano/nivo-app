export interface NameResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Name[]
}

export interface Name {
  firstName: string
  secondName: string
  userName: string
  email: string
  id: string
}