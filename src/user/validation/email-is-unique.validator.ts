import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {

  constructor(private userRepository: UserRepository) { }
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const existUserWithEmail = await this.userRepository.ExistUserWithEmail(value)
    return !existUserWithEmail
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (object: Object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator
    })
  }
}