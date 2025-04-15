const Program = require('../models/Program')

const checkProgramExists = async (brand_name) => {
  return await Program.findOne({
    where: { brand_name }
  })
}

const getAllPrograms = async () => {
  return await Program.findAll()
}

const getProgramById = async (id) => {
  return await Program.findByPk(id)
}

const createProgram = async (data) => {
  return await Program.create(data)
}

const updateProgram = async (id, data) => {
  const program = await Program.findByPk(id)
  if (!program) return null
  await program.update(data)
  return program
}

const deleteProgram = async (id) => {
  const program = await Program.findByPk(id)
  if (!program) return null
  await program.destroy()
  return true
}

module.exports = {
  checkProgramExists,
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
}
