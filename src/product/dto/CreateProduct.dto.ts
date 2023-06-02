import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductCharacteristicsDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;
}

export class ProductImageDTO {
  @IsUrl({}, { message: 'Invalid URL.' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;
}

export class CreateProductDTO {
  @IsUUID(undefined, { message: 'Invalid user ID.' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Product name should not be empty' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'Value must be greater than 0.' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'Invalid min quantity.' })
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  @MaxLength(1000, {
    message: 'Description cannot be longer than 1000 characters',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => ProductCharacteristicsDTO)
  characteristics: ProductCharacteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Category should not be empty' })
  category: string;
}