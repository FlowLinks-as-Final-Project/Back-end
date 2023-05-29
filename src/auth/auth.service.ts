import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { UserLoginDto } from './dto/user-login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | Error> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new NotAcceptableException('Could Not Find The User!');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async signIn(user: any) {
    const validatedUser = await this.validateUser(user.username, user.password);
    if (validatedUser) {
      const payload = { username: user.username, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid Username Or Password!');
  }
}
