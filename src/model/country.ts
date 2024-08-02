export class Country {
  id: number = 0
  name: string = ''
  language: string = ''
  iso_name: string = ''
  administrative_area_google_field: string = ''

  constructor(init?: Partial<Country>) {
    Object.assign(this, init)
  }
}
