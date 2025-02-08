import type { Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import ProductCard, { ProductCardProps } from './ProductCard'

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    id: '1',
    image:
      'https://www.pipsnacks.com/cdn/shop/files/PC_CB_Cheddar_4.5oz_010523-render-front_4702fe4f-0c3d-40d7-a3de-0cdda0f8662d.png',
    title: 'Product Title',
    count: 4,
    price: 5,
    reviewsCount: 97,
  },
}

export default meta

export const Demo = (args: ProductCardProps) => <ProductCard {...args} />
