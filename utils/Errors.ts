export class ExtendedError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
const globalErrorHandler = (error: any) => {
  error.statusCode = error.statusCode || 500
  error.message = error.isOperational ? error.message : 'Something went wrong'
  if (process.env.MODE === 'production') {
    return {
      statusCode: error.statusCode,
      status: 'failed',
      message: error.message,
    }
  } else {
    return {
      statusCode: error.statusCode,
      status: 'failed',
      message: error.message,
      stack: error.stack,
    }
  }
}
export const CatchAsyncError = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error: any) {
      if (error instanceof ExtendedError) {
        return globalErrorHandler(error)
      }
      return globalErrorHandler(new ExtendedError(error.message || 'Internal Server Error', 500))
    }
  }
}
