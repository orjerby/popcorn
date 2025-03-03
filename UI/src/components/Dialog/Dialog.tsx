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
    base: 'fixed z-50 bg-white transition-transform duration-500',
    variants: {
      type: {
        leftToRight:
          'top-0 bottom-0 left-0 group-data-entering:-translate-x-full group-data-exiting:-translate-x-full',
        topToBottom:
          'top-0 right-0 left-0 group-data-entering:-translate-y-full group-data-exiting:-translate-y-full',
      },
    },
  },
  { twMerge: false },
)

export function Dialog({
  type,
  modalProps,
  dialogProps,
  children,
}: {
  type: 'leftToRight' | 'topToBottom'
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
              type,
              className,
            }),
        )}
      >
        <RACDialog {...dialogProps}>{children}</RACDialog>
      </Modal>
    </ModalOverlay>
  )
}
