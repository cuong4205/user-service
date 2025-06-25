import { IsString, IsOptional, IsInt } from 'class-validator';

export class UploadVideoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsInt()
  ageConstraint: number;
}
