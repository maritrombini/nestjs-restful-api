import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { ProductEntity } from "./product.entity";
import { randomUUID } from "crypto";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";

@Controller('/products')
export class ProductController {

  constructor(private productRepository: ProductRepository) {

  }

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity()
    product.id = randomUUID()
    product.userId = productData.userId
    product.name = productData.name
    product.value = productData.value
    product.quantity = productData.quantity
    product.description = productData.description
    product.category = productData.category
    product.characteristics = productData.characteristics
    product.images = productData.images

    const registeredProduct = this.productRepository.save(product)
    return registeredProduct
  }

  @Get()
  async listProducts() {
    return this.productRepository.list()
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: UpdateProductDTO
  ) {
    const updatedProduct = await this.productRepository.update(id, productData)
    return {
      message: 'Product successfully updated!',
      product: updatedProduct
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const removedProduct = await this.productRepository.remove(id)

    return {
      message: 'Product successfully removed!',
      product: removedProduct
    }
  }
}