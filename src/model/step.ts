export class Step {
  id: number = 0
  label: string = ''

  constructor(init?: Partial<Step>) {
    Object.assign(this, init)
  }
}
