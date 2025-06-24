import { IsString, IsOptional } from 'class-validator';

export class UploadVideoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  url: string;
}
