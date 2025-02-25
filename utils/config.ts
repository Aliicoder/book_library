export default {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publickey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privatekey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    dataBaseUrl: process.env.DATA_BASE_URL!,
    auth_secret: process.env.AUTH_SECRET!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
      resendToken: process.env.RESEND_TOKEN!,
    },
  },
}
