import { ReactNode } from 'react'
import {
  composeRenderProps,
  DialogProps,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
  Dialog as RACDialog,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

const styles = tv(
  {
    base: 'fixed bottom-0 left-0 z-50 w-full overflow-y-scroll bg-white transition-transform duration-500 group-data-entering:-translate-x-full group-data-exiting:-translate-x-full',
    variants: {
      aboveHeader: {
        true: 'top-0',
        false: 'top-116',
      },
    },
  },
  { twMerge: false },
)

export function Dialog({
  aboveHeader,
  modalProps,
  dialogProps,
  children,
}: {
  aboveHeader?: boolean
  modalProps?: ModalOverlayProps
  dialogProps?: DialogProps
  children?: ReactNode
}) {
  return (
    <ModalOverlay className="group">
      <Modal
        {...modalProps}
        className={composeRenderProps(
          modalProps?.className,
          (className, renderProps) =>
            styles({
              ...renderProps,
              aboveHeader,
              className,
            }),
        )}
      >
        <RACDialog {...dialogProps} className="h-full px-16 py-24">
          {children}
        </RACDialog>
      </Modal>
    </ModalOverlay>
  )
}
