import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from '../auth/dto/user-create-dto';
import { UserLoginDto } from '../auth/dto/user-login-dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() userCreateDto: UserCreateDto): Promise<any> {
    const { email, password, phoneNumber, username } = userCreateDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.createUser(
      username,
      hashedPassword,
      phoneNumber,
      email,
    );
  }

  @Get('/info/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Get('/all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Put('/update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    if (userUpdateDto.password) {
      const hashedpassword = await bcrypt.hash(userUpdateDto.password, 10);
      userUpdateDto.password = hashedpassword;
    }
    return await this.userService.updateUserServ(userId, userUpdateDto);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUserByIdServ(userId);
  }
}
