import type { Meta } from '@storybook/react'
import { fn } from '@storybook/test'
import { ToggleButtonProps } from 'react-aria-components'
import { ToggleButton } from './ToggleButton'

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onHoverStart: fn(),
    onHoverEnd: fn(),
    onPressStart: fn(),
    onPressEnd: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
}

export default meta

export const Example = (args: ToggleButtonProps) => (
  <ToggleButton {...args}>Pin</ToggleButton>
)
