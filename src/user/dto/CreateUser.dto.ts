import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";

export class CreateUserDTO {

  @IsNotEmpty({ message: 'Name should not be empty.' })
  name: string;

  @IsEmail(undefined, { message: 'Invalid email format.' })
  @EmailIsUnique({ message: 'User with this email already exists.' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string
}