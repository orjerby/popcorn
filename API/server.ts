import cors from 'cors'
import express from 'express'
import { router as productsRouter } from './routers/productsRouter.ts'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
