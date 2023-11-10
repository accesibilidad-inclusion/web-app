import type {Image} from './image'
import {Step} from './step'

export class OnlineStep extends Step {
  details: string = ''
  image: Image | null = null
  focus_size: number | null = null
  focus_x: number | null = null
  focus_y: number | null = null
  screenshot: string | null = null

  constructor(init: Partial<OnlineStep>) {
    super(init)
    Object.assign(this, init)
  }
}
