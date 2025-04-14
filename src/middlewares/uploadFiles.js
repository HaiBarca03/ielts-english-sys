import uploadthing from '../config/uploadthing.js'
import fs from 'fs'

const uploadMiddleware = (model, fieldName) => {
  return async (req, res, next) => {
    if (!req.files || !req.files[fieldName]) {
      return res
        .status(400)
        .json({ error: `No file uploaded for ${fieldName}` })
    }

    const files = req.files[fieldName]

    try {
      const uploadResponses = await Promise.all(
        files.map((file) => uploadthing.uploadFile(file.path))
      )

      const fileUrls = uploadResponses.map(
        (uploadResponse) => uploadResponse.url
      )

      const updateData = {
        [fieldName]: JSON.stringify(fileUrls)
      }

      await model.update(updateData, {
        where: { id: req.params.id }
      })

      files.forEach((file) => fs.unlinkSync(file.path))

      req.uploadResponse = uploadResponses

      next()
    } catch (error) {
      console.error('Upload failed:', error.message)
      res.status(500).json({ error: 'File upload failed' })
    }
  }
}

export default uploadMiddleware
