import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'
import { ListUserDTO } from "./dto/ListUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) {

  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const user = new UserEntity()
    user.id = uuid()
    user.name = userData.name
    user.email = userData.email
    user.password = userData.password

    this.userRepository.save(user)
    return { user: new ListUserDTO(user.id, user.name), message: 'User created!' }
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.list()
    const usersList = savedUsers.map(user => new ListUserDTO(user.id, user.name))
    return usersList
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, data)
    const userData = new ListUserDTO(updatedUser.id, updatedUser.name)

    return {
      user: userData,
      message: 'User Successfully updated!'
    }
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userRepository.remove(id)

    return {
      user: removedUser,
      message: 'User successfully removed!'
    }
  }
}