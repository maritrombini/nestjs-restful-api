import { Type } from "class-transformer";
import { IsUUID, IsString, IsNotEmpty, IsOptional, IsNumber, Min, ValidateNested, IsArray, ArrayMinSize, MaxLength } from "class-validator";
import { ProductCharacteristicsDTO, ProductImageDTO } from "./CreateProduct.dto";

export class UpdateProductDTO {
  @IsUUID(undefined, { message: 'Invalid product ID.' })
  id: string;

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