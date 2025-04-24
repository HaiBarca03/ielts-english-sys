const contentService = require('../services/ContentService')
const programService = require('../services/ProgramService')
const imageService = require('../services/ImageService')
const { uploadToCloud, uploadDocsToCloud } = require('../utils/cloudUpload')

const getAllContents = async (req, res) => {
  try {
    const contents = await contentService.getAllContents(req.query)
    res.json(contents)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getContentsByProgram = async (req, res) => {
  try {
    const { programId } = req.params
    const { type, page, limit } = req.query

    const checkProgram = await programService.getProgramById(programId)
    if (!checkProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }

    const contents = await contentService.getContentsByProgram(
      programId,
      type,
      page,
      limit
    )
    res.json(contents)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getContentById = async (req, res) => {
  try {
    const content = await contentService.getContentById(req.params.id)
    if (!content) {
      return res.status(404).json({ message: 'Content not found' })
    }
    res.json(content)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const createContent = async (req, res) => {
  try {
    const newContent = await contentService.createContent(req.body)
    const content_id = newContent.content_id
    let imageRecords = []
    if (req.files.images && req.files.images.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.images.map((file) => uploadToCloud(file))
      )

      if (!content_id) {
        throw new Error('Content ID is missing or invalid')
      }

      const dataImage = { content_id }
      imageRecords = await imageService.createImages(uploadedImages, dataImage)
    }

    if (req.files.file_url && req.files.file_url.length > 0) {
      const documentFiles = req.files.file_url

      const uploadedDocuments = await Promise.all(
        documentFiles.map((file) => uploadDocsToCloud(file))
      )

      file_url = uploadedDocuments.map((doc) => doc.url)
    }

    if (file_url.length > 0) {
      newContent.file_url = file_url[0]
      await newContent.save()
    }

    res.status(201).json(newContent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id
    const content = await contentService.getContentById(contentId)

    if (!content) {
      return res.status(404).json({ message: 'Content not found' })
    }

    const updatedData = { ...req.body }

    if (req.files.images && req.files.images.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.images.map((file) => uploadToCloud(file))
      )

      const dataImage = { content_id: content.content_id }
      await imageService.createImages(uploadedImages, dataImage)
    }

    let file_url = []
    if (req.files.file_url && req.files.file_url.length > 0) {
      const documentFiles = req.files.file_url

      const uploadedDocuments = await Promise.all(
        documentFiles.map((file) => uploadDocsToCloud(file))
      )

      updatedData.file_url = []

      file_url = uploadedDocuments.map((doc) => doc.url)
    }

    if (file_url.length > 0) {
      updatedData.file_url = file_url[0]
    }

    const updatedContent = await contentService.updateContent(
      contentId,
      updatedData
    )

    res.json(updatedContent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const deleteContent = async (req, res) => {
  try {
    const deletedContent = await contentService.deleteContent(req.params.id)
    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' })
    }
    res.json({ message: 'Content deleted successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getAllContents,
  getContentsByProgram,
  getContentById,
  createContent,
  updateContent,
  deleteContent
}
