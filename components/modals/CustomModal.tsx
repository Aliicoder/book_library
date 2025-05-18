import React from 'react'
import { Button } from '../ui/button'

const icons: Record<string, string> = {
  warning: '/icons/denyIcon.png',
  confirmation: '/icons/approveIcon.png',
  notification: '/icons/noteIcon.png',
}
const styles: Record<string, string> = {
  warning: 'bg-red-600 text-white hover:bg-red-700',
  confirmation: 'bg-green-600 text-white hover:bg-green-700',
  notification: 'bg-blue-600 text-white hover:bg-blue-700',
}

interface IActionModalProps {
  type: 'warning' | 'confirmation' | 'notification'
  title: string
  message?: string
  confirmText?: string
  handleClick: () => void
  isLoading: boolean
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
  isShowModal: boolean
}

const ActionModal = ({
  type,
  title,
  message = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  handleClick,
  setIsShowModal,
  isLoading,
  isShowModal,
}: IActionModalProps) => {
  return (
    <>
      {isShowModal && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <img src={icons[type]} alt="" className="mx-auto mb-4 w-12 h-12" />
            <h1 className="text-gray-900 font-bold text-lg mb-2">{title}</h1>
            <p className="text-gray-800 text-sm mb-6">{message}</p>

            <div className="flex gap-4 justify-center mt-5">
              <Button disabled={isLoading} onClick={handleClick} className={styles[type]}>
                {confirmText}
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => setIsShowModal(false)}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 "
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActionModal
