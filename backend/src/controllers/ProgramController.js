const programService = require('../services/ProgramService')

const getAllPrograms = async (req, res) => {
  try {
    const { page, limit } = req.query
    const programs = await programService.getAllPrograms(page, limit)
    res.json(programs)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getProgramById = async (req, res) => {
  const program = await programService.getProgramById(req.params.id)
  if (!program) return res.status(404).json({ message: 'Program not found' })
  res.json(program)
}

const createProgram = async (req, res) => {
  try {
    const { brand_name } = req.body

    const existingProgram = await programService.checkProgramExists(brand_name)
    if (existingProgram) {
      return res.status(400).json({ message: 'Brand name already exists' })
    }

    const newProgram = await programService.createProgram(req.body)
    res.status(201).json(newProgram)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateProgram = async (req, res) => {
  const checkProgram = await programService.getProgramById(req.params.id)
  if (!checkProgram) {
    return res.status(404).json({ message: 'Program not found' })
  }
  const updated = await programService.updateProgram(req.params.id, req.body)
  if (!updated) return res.status(404).json({ message: 'Program not found' })
  res.json(updated)
}

const deleteProgram = async (req, res) => {
  const deleted = await programService.deleteProgram(req.params.id)
  if (!deleted) return res.status(404).json({ message: 'Program not found' })
  res.json({ message: 'Program deleted successfully' })
}

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
}
