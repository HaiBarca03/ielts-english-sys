const { Content, Program, Image } = require('../models')

const checkProgramExists = async (brand_name) => {
  return await Program.findOne({
    where: { brand_name }
  })
}

const getAllPrograms = async (page = 1, limit = 10) => {
  const offset = (parseInt(page) - 1) * parseInt(limit)

  const { count, rows } = await Program.findAndCountAll({
    offset,
    limit: parseInt(limit),
    order: [['created_at', 'DESC']]
  })

  return {
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
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
