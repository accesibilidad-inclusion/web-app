import {Evaluation} from './evaluation'
import type {OnlineTask} from './online_task'
import type {PresentialTask} from './presential_task'
import {Category} from './category'
import {Service} from './service'

export class Venue {
  id: number = 0
  name: string = ''
  slug: string = ''
  distance: number = 0
  show_evaluation: boolean = true
  evaluation?: Evaluation
  tasks?: Array<PresentialTask | OnlineTask>
  category: Category = new Category()
  service: Service = new Service()

  constructor(init?: Partial<Venue>) {
    Object.assign(this, init)
  }
}
