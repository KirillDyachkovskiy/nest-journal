import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  tags?: string;

  @IsNumber()
  userId: number;
}
