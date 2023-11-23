export class Answer {
  question_id: number = 0
  type: string = ''
  answer: any = null

  constructor(init?: Partial<Answer>) {
    Object.assign(this, init)
  }
}
