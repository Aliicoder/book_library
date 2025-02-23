import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import config from '@/utils/config'

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status} : ${errorText}`)
    }
    const { signature, expire, token } = await response.json()
    return { signature, expire, token }
  } catch (error: any) {
    throw new Error(error)
  }
}
const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const onSuccess = (res: any) => {
    console.log('upload image success : ', res)
    toast.success(`image uploaded : ${res.filePath}`)
    setFile({ filePath: res.filePath })
    onFileChange(res.filePath)
  }
  const onError = (error: any) => {
    console.error('upload image error : ', error)
    toast(`error occurred : ${error}`)
  }
  useEffect(() => {
    console.log(`file uploaded `, file)
  }, [file])
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publickey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={IKUploadRef}
        className="hidden"
        onSuccess={onSuccess}
        onError={onError}
        fileName="test-upload.png"
      />
      <Button
        className="w-full text-black bg-light-100 hover:bg-light-800 "
        onClick={(event) => {
          event.preventDefault()
          if (IKUploadRef.current) {
            IKUploadRef.current.click()
          }
        }}
      >
        Select
      </Button>
      {file ? <p>{file.filePath}</p> : <p>No file selected</p>}
      {file && (
        <IKImage
          className="w-full object-contain"
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
