import type {Commune} from './commune'

export interface Region {
  id: number
  name: string
  communes: Array<Commune>
}
