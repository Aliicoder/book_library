import React from 'react'
import { Button } from '../ui/button'
interface IRaiseRequestModalProps {
  handleRaiseBorrowRequestClick: () => void
  isLoading: boolean
  setIsShowConfirm: React.Dispatch<React.SetStateAction<boolean>>
  isShowConfirm: boolean
}
const RaiseRequestModal = ({
  handleRaiseBorrowRequestClick,
  setIsShowConfirm,
  isLoading,
  isShowConfirm,
}: IRaiseRequestModalProps) => {
  return (
    <>
      {isShowConfirm && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <img src="/icons/approveIcon.png" alt="" className="mx-auto mb-4" />
            <h1 className="text-gray-900 font-bold font-ibm-plex-sans text-lg mb-2">
              Approve Book Request
            </h1>
            <p className="text-gray-800 text-sm mb-6">
              Approve the borrowing request and agree to the terms.
              <br /> A confirmation email will be sent upon approval.
            </p>
            <div className="text-left">
              <h2 className="text-md font-semibold text-gray-800 mb-2">Terms & Conditions:</h2>
              <ul className="list-none space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✔️</span>
                  <span>
                    Return the book within <strong>7 days</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✔️</span>
                  <span>
                    Return the book in the <strong>same condition</strong> it was received.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✔️</span>
                  <span>
                    <strong>Late return fees</strong> will apply if the deadline is missed.
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center mt-5">
              <Button
                disabled={isLoading}
                onClick={handleRaiseBorrowRequestClick}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                I Agree & Borrow
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => setIsShowConfirm(false)}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
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

export default RaiseRequestModal
