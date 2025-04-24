const { Image } = require('../models')
const imageService = require('../services/ImageService')
const { uploadToCloud } = require('../utils/cloudUpload')
const cloudinary = require('cloudinary').v2

const createImage = async (req, res) => {
  try {
    const files = req.files
    const uploadedImages = await Promise.all(
      files.map((file) => uploadToCloud(file))
    )
    const imageRecords = await imageService.createImages(
      uploadedImages,
      req.body
    )

    res.status(201).json(imageRecords)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const deleteImages = async (req, res) => {
  try {
    const { imageIds } = req.body

    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return res
        .status(400)
        .json({ message: 'imageIds must be a non-empty array' })
    }

    const images = await Image.findAll({ where: { image_id: imageIds } })

    await Promise.all(
      images.map(
        (img) => img.public_id && cloudinary.uploader.destroy(img.public_id)
      )
    )

    const deleted = await imageService.deleteImagesFromDB(imageIds)

    res.status(200).json({
      message: 'Images deleted',
      deleted
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getImagesByContentId = async (req, res) => {
  try {
    const { contentId } = req.params
    const images = await imageService.getImagesByContentId(contentId)
    res.json(images)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  createImage,
  getImagesByContentId,
  deleteImages
}
