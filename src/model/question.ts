export class Question {
  id: number = 0
  answer_type: string = ''
  text: string = ''
  options: Array<{id:number, name:string}> = []
}
