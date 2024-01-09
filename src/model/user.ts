export class User {
  id: number | null = null
  disability: string | null = null
  disabilities: Array<string> = []
  dayBirth: string | null = null
  monthBirth: string | null = null
  yearBirth: string | null = null
  birthday: string | null = null
  gender: string | null = null
  device: string | null = null

  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  isRegistered = (): boolean => {
    return !!this.id
  }
}
