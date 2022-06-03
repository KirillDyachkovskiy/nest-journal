import { IsEmail, IsString, Length } from 'class-validator';
import { Match } from 'src/types/match.decorator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  password: string;

  @IsString()
  @Length(4, 20)
  @Match('password')
  passwordConfirm: string;
}
