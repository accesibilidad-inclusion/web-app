import type {Evaluation} from './evaluation'

export interface Venue {
  id: number
  name: string
  slug: string
  distance: number
  show_evaluation?: boolean
  evaluation: Evaluation
}
