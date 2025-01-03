import express, { type Request, type Response } from 'express'
import { getProducts } from '../BLL/products/productsBLL.ts'

export const router = express.Router()

const sendErrorResponse = (
  res: Response,
  message: string,
  status: number = 400
) => {
  res.status(status).json({ error: message })
}

router.get('/', async (_: Request, res: Response) => {
  try {
    const products = await getProducts()
    res.json(products)
  } catch (error) {
    sendErrorResponse(res, 'Failed to fetch products', 500)
  }
})

// router.post('/new', async (req: Request, res: Response) => {
//   const { title, content } = req.body

//   if (
//     ![title, content].every(
//       (field) => typeof field === 'string' && field.trim()
//     )
//   ) {
//     return sendErrorResponse(res, 'Title and content must be non-empty strings')
//   }

//   try {
//     const newProduct = { title, content }
//     const addedProduct = await addProduct(newProduct)
//     res.status(201).json({ success: true, product: addedProduct })
//   } catch (error) {
//     sendErrorResponse(res, 'Failed to add product', 500)
//   }
// })
