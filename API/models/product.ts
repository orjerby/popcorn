export type SnackType =
  | 'Cheese Balls'
  | 'Crunchies'
  | 'Dippers'
  | 'Fries'
  | 'Popcorn'
  | 'Twists'

export type SnackFlavor =
  | 'Cheddar'
  | 'Cinnamon Sugar'
  | 'Fiery'
  | 'Honey Barbeque'
  | 'Jalapeño Cheddar'
  | 'Sea Salt'
  | 'Truffle'
  | 'Variety'
  | 'White Cheddar'

export type Product = {
  id: string
  title: string
  count: number
  size: string
  price: number
  description: string
  images: string[]
  type: SnackType
  flavor: SnackFlavor
  color?: `#${string}`
  reviews: {
    rate: number
    title: string
    description: string
    name: string
  }[]
}

export type DatabaseSchema = {
  products: Product[]
}
