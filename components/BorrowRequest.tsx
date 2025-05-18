'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { raiseBorrowRequest } from '@/app/api/actions/book'
import toast from 'react-hot-toast'
import RaiseRequestModal from './modals/RaiseRequestModal'
import { Send } from 'lucide-react'

const BorrowRequest = ({ bookId, userId }: { bookId: string; userId: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isShowConfirm, setIsShowConfirm] = useState(false)

  const handleRaiseBorrowRequestClick = async () => {
    setIsLoading(true)
    try {
      const response = await raiseBorrowRequest({ bookId, userId })
      if (response.status === 'success') {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      toast.error(error.message ?? 'Unknown error')
    } finally {
      setIsLoading(false)
      setIsShowConfirm(false)
    }
  }

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={() => setIsShowConfirm(true)}
        className="bg-primary text-dark-100 hover:bg-primary/90 w-fit 
        flex items-center gap-2"
      >
        Borrow Request
        <Send />
      </Button>
      <RaiseRequestModal
        isShowConfirm={isShowConfirm}
        setIsShowConfirm={setIsShowConfirm}
        handleRaiseBorrowRequestClick={handleRaiseBorrowRequestClick}
        isLoading={isLoading}
      />
    </>
  )
}

export default BorrowRequest
