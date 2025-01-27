import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUserById(@Param("id") id: number){
    return this.userService.findById(id)
  }

  @Put(":id")
  async updateUser(@Param("id") id: number, @Body() newData: Omit<User, "id">){
    return this.userService.updateUser(id, newData)
  }
}
