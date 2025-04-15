const Content = require('../models/Content')

const getAllContents = async () => {
  return await Content.findAll({
    include: ['Program']
  })
}
const getContentsByProgram = async (programId, type) => {
  const whereClause = {
    program_id: programId
  }

  if (type) {
    whereClause.type = type
  }

  return await Content.findAll({
    where: whereClause,
    order: [['created_at', 'DESC']]
  })
}

const getContentById = async (id) => {
  return await Content.findByPk(id, {
    include: ['Program']
  })
}

const createContent = async (data) => {
  return await Content.create(data)
}

const updateContent = async (id, data) => {
  const content = await Content.findByPk(id)
  if (!content) return null
  await content.update(data)
  return content
}

const deleteContent = async (id) => {
  const content = await Content.findByPk(id)
  if (!content) return null
  await content.destroy()
  return content
}

module.exports = {
  getAllContents,
  getContentsByProgram,
  getContentById,
  createContent,
  updateContent,
  deleteContent
}
