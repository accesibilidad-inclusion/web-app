export class Image {
  id: number = 0
  filename: string = ''
  path: string = ''
  layout: number = 0
  label: string = ''

  constructor(init?: Partial<Image>) {
    Object.assign(this, init)
  }
}
