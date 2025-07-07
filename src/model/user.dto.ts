import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class UserDto {
  @IsString()
  user_name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  age: number;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
