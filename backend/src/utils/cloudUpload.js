const fs = require('fs')
const { cloudinary_js_config } = require('../config/cloudinary.config')
const cloudinary = require('cloudinary').v2

const uploadToCloud = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { folder: 'images' },
      (err, result) => {
        if (err) reject(err)
        fs.unlinkSync(file.path)
        resolve(result)
      }
    )
  })
}

const uploadDocsToCloud = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        folder: 'documents',
        public_id: `doc-${Date.now()}-${file.originalname.split('.')[0]}`,
        resource_type: 'raw'
      },
      (err, result) => {
        if (err) reject(err)
        fs.unlinkSync(file.path)
        resolve(result)
      }
    )
  })
}

module.exports = {
  uploadToCloud,
  uploadDocsToCloud
}
