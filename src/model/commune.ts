export class Commune {
  id: number = 0
  name: string = ''
  lat: string = ''
  lng: string = ''
  region_id: number = 0

  constructor(init?: Partial<Commune>) {
    Object.assign(this, init)
  }
}
