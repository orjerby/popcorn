import { getProducts as getProductsDAL } from '../../DAL/products/productsDAL.ts'

export const getProducts = async () => {
  try {
    return await getProductsDAL()
  } catch (error) {
    console.error('Failed to retrieve products:', error)
    throw new Error('Error fetching products')
  }
}

// export const addProduct = async (product: AddProductBLL) => {
//   try {
//     const newProduct = { id: nanoid(), ...product }
//     return await addProductDAL(newProduct)
//   } catch (error) {
//     console.error('Failed to add product:', error)
//     throw new Error('Error adding new product')
//   }
// }
