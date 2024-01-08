import {PresentialTask} from './presential_task'
import {Venue} from './venue'

export class PresentialVenue extends Venue {
  distance: number = 0
  position: {lat: number; lng: number} | null = null

  constructor(init?: Partial<PresentialVenue>) {
    super(init)
    Object.assign(this, init)
    this.tasks = this.tasks?.map((t) => new PresentialTask(t as PresentialTask))
  }

  distanceToText = () => {
    if (this.distance > 999) {
      return `${Math.round((this.distance / 1000) * 10) / 10} kilómetros`
    }
    return `${Math.round(this.distance)} metros`
  }

  get mapLink() {
    return typeof this.position === 'object' && this.position !== null
      ? `https://www.google.com/maps/search/?api=1&query=${this.position.lat},${this.position.lng}`
      : ''
  }
}
