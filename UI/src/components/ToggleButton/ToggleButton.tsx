import {
  ToggleButton as RACToggleButton,
  ToggleButtonProps,
  composeRenderProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { twMergeConfig } from '../../tailwind/tailwindMerge'

const styles = tv(
  {
    base: 'text-14 rounded-6 block cursor-pointer border border-[#C1803E] px-[8px] py-[2px] font-normal',
    variants: {
      isSelected: {
        false: 'bg-[#F9F1E6] text-black',
        true: 'bg-[#C1803E] text-white',
      },
      isDisabled: {
        true: '',
      },
    },
  },
  { twMergeConfig },
)

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    />
  )
}
