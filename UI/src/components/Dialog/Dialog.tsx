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
import { cn, twMergeConfig } from '../../tailwind/tailwindMerge'

const styles = tv(
  {
    slots: {
      modal: 'fixed z-50 duration-500',
      dialog: '',
    },
    variants: {
      type: {
        leftToRight: {
          modal:
            'top-0 bottom-0 left-0 transition-transform group-data-entering:-translate-x-full group-data-exiting:-translate-x-full',
          dialog: 'h-full w-svw',
        },
        topToBottom: {
          modal:
            'top-0 right-0 left-0 transition-transform group-data-entering:-translate-y-full group-data-exiting:-translate-y-full',
          dialog: 'h-svh',
        },
        center: {
          modal:
            'inset-0 flex items-center justify-center opacity-100 transition-opacity group-data-entering:opacity-0 group-data-exiting:opacity-0',
        },
      },
    },
  },
  { twMergeConfig },
)

export function Dialog({
  type,
  modalProps,
  dialogProps,
  children,
}: {
  type: 'leftToRight' | 'topToBottom' | 'center'
  modalProps?: ModalOverlayProps
  dialogProps?: DialogProps
  children?: ReactNode
}) {
  const dialogStyles = styles({ type })

  return (
    <ModalOverlay className="group">
      <Modal
        className={composeRenderProps(
          modalProps?.className,
          (className, renderProps) =>
            dialogStyles.modal({
              ...renderProps,
              className,
            }),
        )}
      >
        <RACDialog
          className={cn(dialogStyles.dialog(), dialogProps?.className)}
        >
          {children}
        </RACDialog>
      </Modal>
    </ModalOverlay>
  )
}
