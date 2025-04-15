const contentService = require('../services/ContentService')
const programService = require('../services/ProgramService')

const getAllContents = async (req, res) => {
  try {
    const contents = await contentService.getAllContents()
    res.json(contents)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getContentsByProgram = async (req, res) => {
  try {
    const { programId } = req.params
    const { type } = req.query
    const checkProgram = await programService.getProgramById(programId)
    if (!checkProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }
    const contents = await contentService.getContentsByProgram(programId, type)
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
    res.status(201).json(newContent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateContent = async (req, res) => {
  try {
    const updatedContent = await contentService.updateContent(
      req.params.id,
      req.body
    )
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' })
    }
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
