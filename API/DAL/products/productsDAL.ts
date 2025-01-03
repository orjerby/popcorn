import db from '../../db/db.ts'
import type { Product } from '../../models/product.ts'

export const getProducts = (): Product[] => {
  return db.data.products
}

// export const addProduct = async (product: Product): Promise<Product[]> => {
//   try {
//     await db.update(({ products }) => {
//       products.push(product)
//     })

//     return db.data.products
//   } catch (error) {
//     console.error('Failed to add product:', error)
//     throw new Error('Error adding product to database')
//   }
// }
