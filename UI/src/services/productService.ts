import axios from 'axios'
import { Product } from '../../../API/models/product'

// Base URL for API
const API_URL = 'http://localhost:3000/products'

/**
 * Fetch all products from the API
 * @returns {Promise<Product[]>} - List of products
 */
export const getProducts = new Promise<Product[]>(async (resolve) => {
  try {
    const response = await axios.get<Product[]>(API_URL)
    resolve(response.data)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
