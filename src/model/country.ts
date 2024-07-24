export class Country {
  id: number = 0
  name: string = ''
  language: string = ''
  administrative_area_google_field: string = ''

  constructor(init?: Partial<Country>) {
    Object.assign(this, init)
  }
}
