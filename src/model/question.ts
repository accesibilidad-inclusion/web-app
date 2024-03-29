export class Question {
  id: number = 0
  answer_type: string = ''
  text: string = ''
  icon: string = ''
  options: Array<{id:number, name:string}> = []
  questions: Array<Question> = []

  constructor(init?: Partial<Question>) {
    Object.assign(this, init)
  }
}
