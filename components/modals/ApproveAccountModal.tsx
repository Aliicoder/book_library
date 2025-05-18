import React from 'react'
import { Button } from '../ui/button'
interface IApproveAccountModalProps {
  handleApproveAccountRequestClick: () => void
  isLoading: boolean
  setIsShowApproveModal: React.Dispatch<React.SetStateAction<boolean>>
  isShowApproveModal: boolean
}
const ApproveAccountModal = ({
  handleApproveAccountRequestClick,
  setIsShowApproveModal,
  isLoading,
  isShowApproveModal,
}: IApproveAccountModalProps) => {
  return (
    <>
      {isShowApproveModal && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <img src="/icons/approveIcon.png" alt="" className="mx-auto mb-4" />
            <h1 className="text-gray-900 font-bold font-ibm-plex-sans text-lg mb-2">
              Approve Account Request
            </h1>
            <p className="text-gray-800 text-sm mb-6">
              Approve the student’s account request and grant access
            </p>

            <div className="flex gap-4 justify-center mt-5">
              <Button
                disabled={isLoading}
                onClick={handleApproveAccountRequestClick}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                I Agree & Borrow
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => setIsShowApproveModal(false)}
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

export default ApproveAccountModal
