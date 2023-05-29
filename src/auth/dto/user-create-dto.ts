import { Transform, TransformFnParams } from '@nestjs/class-transformer';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
  IsEmail,
} from '@nestjs/class-validator';

export class UserCreateDto {
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @Matches(/^09[0-9]{9}$/)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;
}
