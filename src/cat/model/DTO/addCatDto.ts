import { IsString, IsInt, IsOptional } from 'class-validator';

export class AddCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsOptional()
  @IsString()
  breed?: string;
}