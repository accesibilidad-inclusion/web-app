export class Location {
  lat: string = ''
  lng: string = ''
  name?: string
  region_id?: number

  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }
}
