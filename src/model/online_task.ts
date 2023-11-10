import {OnlineVenue} from './online_venue'
import {Task} from './task'

export class OnlineTask extends Task {
  venue: OnlineVenue = new OnlineVenue()

  constructor(init: Partial<OnlineTask>) {
    super(init)
    Object.assign(this, init)
  }
}
