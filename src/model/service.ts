export class Service {
  id: number | null = null
  name: string = ''
  slug: string = ''
  distance: number = 0
  count_presential: number = 0
  count_online: number = 0

  constructor(init?: Partial<Service>) {
    Object.assign(this, init)
  }
}
