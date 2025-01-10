import cors from 'cors'
import express from 'express'
import killPort from 'kill-port'
import { router as productsRouter } from './routers/productsRouter.ts'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/products', productsRouter)

killPort(port, 'tcp')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error(`Error freeing up port ${port}:`, err)
  })
