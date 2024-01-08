import {OnlineTask} from './online_task'
import {Venue} from './venue'

export class OnlineVenue extends Venue {
  url: string = ''

  constructor(init?: Partial<OnlineVenue>) {
    super(init)
    Object.assign(this, init)
    this.tasks = this.tasks?.map((t) => new OnlineTask(t as OnlineTask))
  }
}
