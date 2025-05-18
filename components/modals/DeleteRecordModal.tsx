import React from 'react'
import { Button } from '../ui/button'
interface IDeleteRecordModalProps {
  handleDeleteRecordRequestClick: () => void
  isLoading: boolean
  setIsShowDeleteRecordModal: React.Dispatch<React.SetStateAction<boolean>>
  isShowDeleteRecordModal: boolean
}
const DeleteRecordModal = ({
  handleDeleteRecordRequestClick,
  setIsShowDeleteRecordModal,
  isLoading,
  isShowDeleteRecordModal,
}: IDeleteRecordModalProps) => {
  return (
    <>
      {isShowDeleteRecordModal && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <img src="/icons/denyIcon.png" alt="" className="mx-auto mb-4" />
            <h1 className="text-gray-900 font-bold font-ibm-plex-sans text-lg mb-2">
              Confirm Deletion
            </h1>
            <p className="text-gray-800 text-sm mb-6">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>

            <div className="flex gap-4 justify-center mt-5">
              <Button
                disabled={isLoading}
                onClick={handleDeleteRecordRequestClick}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => setIsShowDeleteRecordModal(false)}
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

export default DeleteRecordModal
