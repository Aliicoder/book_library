import config from '@/utils/config'
import { Client as WorkflowClient } from '@upstash/workflow'
import { Client as ResendClient, resend } from '@upstash/qstash'

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
})

export const qstashClient = new ResendClient({ token: config.env.upstash.qstashToken })

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string
  subject: string
  message: String
}) => {
  await qstashClient.publishJSON({
    api: {
      name: 'email',
      provider: resend({ token: config.env.upstash.resendToken }),
    },
    body: {
      from: 'book_library <info@alicoder.site>',
      to: [email],
      subject,
      html: message,
    },
  })
}
