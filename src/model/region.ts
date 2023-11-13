import type { Commune } from "./commune"

export class Region {
  id: number = 0
  name: string = ''
  communes: Array<Commune> = []

  constructor(init?: Partial<Region>) {
    Object.assign(this, init)
  }
}
