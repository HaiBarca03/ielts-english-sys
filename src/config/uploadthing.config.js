import dotenv from 'dotenv'
import { createUploadThing } from 'uploadthing'
dotenv.config()

const uploadthing = createUploadThing({
  secretKey: process.env.UPLOADTHING_SECRET,
  appId: process.env.UPLOADTHING_APP_ID
})

export default uploadthing
