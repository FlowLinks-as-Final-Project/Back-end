import { IsOptional, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password: string;
}
