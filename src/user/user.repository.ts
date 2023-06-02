import { Injectable } from "@nestjs/common"
import { UserEntity } from "./user.entity"

@Injectable()
export class UserRepository {
  private users: UserEntity[] = []

  async save(user: UserEntity) {
    this.users.push(user)
  }

  async list() {
    return this.users
  }

  async ExistUserWithEmail(email: string) {
    const possibleUser = this.users.find(
      user => user.email === email
    )
    return possibleUser !== undefined
  }

  private searchById(id: string) {
    const possibleUser = this.users.find(user => user.id === id)

    if (!possibleUser) {
      throw new Error("User doesn't exists.")
    }
    return possibleUser
  }

  async update(id: string, data: Partial<UserEntity>) {
    const user = this.searchById(id)

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') {
        return
      }
      user[key] = value
    })
    return user
  }

  async remove(id: string) {
    const user = this.searchById(id)
    this.users = this.users.filter(user => user.id !== id)
    return user
  }
}