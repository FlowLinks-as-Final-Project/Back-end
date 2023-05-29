import {
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
  IsBoolean,
} from '@nestjs/class-validator';

export class UserLoginDto {
  @MinLength(3)
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Matches(/^09[0-9]{9}$/)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
