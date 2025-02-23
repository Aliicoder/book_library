import config from '@/utils/config'
import ImageKit from 'imagekit'
import { NextResponse } from 'next/server'
const imagekit = new ImageKit({
  publicKey: config.env.imagekit.publickey,
  urlEndpoint: config.env.imagekit.urlEndpoint,
  privateKey: config.env.imagekit.privatekey,
})
export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters())
}
