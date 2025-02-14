import {
  Checkbox as AriaCheckbox,
  CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components'

export type StandardCheckboxBaseProps = AriaCheckboxProps & {
  isDirty?: boolean
  isTouched?: boolean
}

export function StandardCheckboxBase({
  isDirty = false,
  isTouched = false,
  ...props
}: StandardCheckboxBaseProps) {
  return (
    <AriaCheckbox
      {...props}
      data-dirty={isDirty || undefined}
      data-touched={isTouched || undefined}
      className="group font-segoe-ui flex cursor-pointer gap-11"
    >
      <div className="rounded-5 before:rounded-5 relative flex size-18 items-center justify-center shadow-[0_0_0_1px_#dedede_inset] transition-shadow duration-150 ease-[cubic-bezier(0.3,0.5,0.5,1)] group-data-pressed:shadow-[0_0_0_1px_#b69775_inset] group-data-selected:shadow-[0_0_0_9px_#b69775_inset] before:absolute before:size-full before:opacity-30 before:shadow-[0_0_0_0px_#b69775_inset,_0_0_0_0px_#b69775] before:transition-shadow before:duration-150 before:ease-[cubic-bezier(0.3,0.5,0.5,1)] group-data-focus-visible:before:shadow-[0_0_0_1px_#b69775_inset,_0_0_0_3px_#b69775]">
        <svg
          viewBox="0 0 14 14"
          aria-hidden="true"
          className="size-10 fill-none stroke-current text-white opacity-0 transition-opacity duration-150 ease-in-out group-data-selected:opacity-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.1 2.8-5.877 8.843a.35.35 0 0 1-.54.054L1.4 7.4"
            className="stroke-[1.4px] [vector-effect:non-scaling-stroke]"
          ></path>
        </svg>
      </div>
      <div className="text-14 text-black">
        <>{props.children}</>
      </div>
    </AriaCheckbox>
  )
}
