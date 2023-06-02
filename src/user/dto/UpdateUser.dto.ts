import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";

export class UpdateUserDTO {

  @IsNotEmpty({ message: 'Name should not be empty.' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Invalid email format.' })
  @EmailIsUnique({ message: 'User with this email already exists.' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @IsOptional()
  password: string
}