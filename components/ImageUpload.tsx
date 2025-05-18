import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import config from '@/utils/config'
import { cn } from '@/lib/utils'
import UploadFileSvgIcon from './svgs/UploadFileSvgIcon'

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiCurEndpoint}/api/auth/imageKit`)
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
interface Props {
  className: string
  icon?: React.ReactNode
  type: 'image' | 'video'
  accept: string
  placeholder?: string
  folder: string
  variant: 'dark' | 'light'
  onFileChange: (filePath: string) => void
}
const ImageUpload = ({
  icon,
  className,
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const [progress, setProgress] = useState(0)
  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border border-gray',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
  }
  const onSuccess = (res: any) => {
    toast.success(`${type} upload succeeded `)
    setFile({ filePath: res.filePath })
    onFileChange(res.filePath)
  }
  const onError = (error: any) => {
    toast.error(`${type} upload failed `)
  }
  const onValidate = (file: File) => {
    if (!accept.split(',').includes(file.type)) {
      toast.error(`Invalid file type. Allowed: ${accept}`)
      return false
    }

    if (type == 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast.error('image size is larger than 20mb')
        return false
      }
    } else if (type == 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast.error('video size is larger than 20mb')
        return false
      }
    }
    return true
  }

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
        validateFile={onValidate}
        useUniqueFileName={true}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ total, loaded }) => {
          let percentage = Math.round((loaded / total) * 100)
          setProgress(percentage)
        }}
        folder={folder}
      />
      <Button
        className={cn(
          'relative overflow-hidden p-3 border-2 rounded-md transition-all duration-300',
          styles.button,
          className
        )}
        style={{
          borderColor: progress === 100 ? 'green' : '', // Change border color dynamically
        }}
        onClick={(event) => {
          event.preventDefault()
          if (IKUploadRef.current) {
            IKUploadRef.current.click()
          }
        }}
      >
        {progress > 0 && progress < 100 ? `${progress} %` : icon}
        <h1 className={cn('', styles.placeholder)}>
          {progress == 100 ? `${type} uploaded` : (placeholder ?? '')}
        </h1>
      </Button>
    </ImageKitProvider>
  )
}

export default ImageUpload
