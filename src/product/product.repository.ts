import { Injectable } from "@nestjs/common"
import { ProductEntity } from "./product.entity"

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = []

  async save(product: ProductEntity) {
    this.products.push(product)
    return product
  }

  async list() {
    return this.products
  }

  private searchById(id: string) {
    const possibleProduct = this.products.find(product => product.id === id)

    if (!possibleProduct) {
      throw new Error("Product doesn't exists.")
    }

    return possibleProduct
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const nonUpdateableData = ['id', 'userId']
    const product = this.searchById(id)
    Object.entries(productData).forEach(([key, value]) => {
      if (nonUpdateableData.includes(key)) {
        return
      }
      product[key] = value
    })
    return product
  }

  async remove(id: string) {
    const removedProduct = this.searchById(id)
    this.products = this.products.filter(product => product.id !== id)
    return removedProduct
  }
}