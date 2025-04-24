const { Content, Program, Image } = require('../models')

const createImages = async (images, data) => {
  const createdImages = await Promise.all(
    images.map((img) => {
      return Image.create({
        url: img.secure_url,
        public_id: img.public_id,
        content_id: data.content_id || null,
        user_id: data.user_id || null
      })
    })
  )
  return createdImages
}

const deleteImagesFromDB = async (imageIds = []) => {
  const deleted = []

  for (const id of imageIds) {
    const image = await Image.findByPk(id)
    if (!image) continue
    await image.destroy()
    deleted.push({ id, status: 'deleted' })
  }

  return deleted
}

const getImagesByContentId = async (contentId) => {
  return await Image.findAll({
    where: { content_id: contentId }
  })
}

module.exports = {
  createImages,
  getImagesByContentId,
  deleteImagesFromDB
}
