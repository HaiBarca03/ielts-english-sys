const multer = require('multer')

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

const uploadImages = upload.array('images', 10)

const uploadImage = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next()
  }

  upload.single('avatar')(req, res, next)
}

const uploadDocuments = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next()
  }

  upload.array('file_url', 5)(req, res, next)
}

const uploadFiles = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'file_url', maxCount: 5 }
])
module.exports = {
  uploadImages,
  uploadImage,
  uploadDocuments,
  uploadFiles
}
