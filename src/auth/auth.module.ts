import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../user/schemas/user.schema"
import { LocalStrategy } from './local.auth';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }