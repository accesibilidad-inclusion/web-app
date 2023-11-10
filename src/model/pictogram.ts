import type {Image} from './image'

export class Pictogram {
  id: number = 0
  images: Array<Image> = []

  constructor(init?: Partial<Pictogram>) {
    Object.assign(this, init)
  }
}
