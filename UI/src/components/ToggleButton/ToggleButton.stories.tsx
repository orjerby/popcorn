import type { Meta } from '@storybook/react'
import { ToggleButtonProps } from 'react-aria-components'
import { ToggleButton } from './ToggleButton'

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Demo = (args: ToggleButtonProps) => (
  <ToggleButton {...args}>Pin</ToggleButton>
)
