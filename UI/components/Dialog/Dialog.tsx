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
      overlay:
        'group fixed top-0 left-0 z-50 h-(--visual-viewport-height) w-full',
      modal: 'fixed duration-500',
      dialog: 'h-full',
    },
    variants: {
      type: {
        leftToRight: {
          modal:
            'left-0 size-full transition-transform group-data-entering:-translate-x-full group-data-exiting:-translate-x-full',
        },
        rightToLeft: {
          modal:
            'right-0 size-full transition-transform group-data-entering:translate-x-full group-data-exiting:translate-x-full',
        },
        topToBottom: {
          modal:
            'top-0 size-full transition-transform group-data-entering:-translate-y-full group-data-exiting:-translate-y-full',
        },
        center: {
          modal:
            'inset-0 m-auto flex items-center justify-center opacity-100 transition-opacity group-data-entering:opacity-0 group-data-exiting:opacity-0',
        },
      },
    },
  },
  { twMergeConfig },
)

export function Dialog({
  type,
  overlayProps,
  modalProps,
  dialogProps,
  children,
}: {
  type: 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'center'
  overlayProps?: ModalOverlayProps
  modalProps?: ModalOverlayProps
  dialogProps?: DialogProps
  children?: ReactNode
}) {
  const dialogStyles = styles({ type })

  return (
    <ModalOverlay
      {...overlayProps}
      className={composeRenderProps(
        overlayProps?.className,
        (className, renderProps) =>
          dialogStyles.overlay({
            ...renderProps,
            className,
          }),
      )}
    >
      <Modal
        {...modalProps}
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
          {...dialogProps}
          className={cn(dialogStyles.dialog(), dialogProps?.className)}
        >
          {children}
        </RACDialog>
      </Modal>
    </ModalOverlay>
  )
}
