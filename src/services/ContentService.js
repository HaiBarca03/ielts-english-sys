const { Content, Program, Image } = require('../models')

const getAllContents = async (query) => {
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 10
  const offset = (page - 1) * limit

  const { count, rows } = await Content.findAndCountAll({
    offset,
    limit,
    include: [
      {
        model: Program
      }
    ]
  })

  return {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getContentsByProgram = async (programId, type, page = 1, limit = 10) => {
  const whereClause = { program_id: programId }
  if (type) whereClause.type = type

  const offset = (parseInt(page) - 1) * parseInt(limit)

  const { count, rows } = await Content.findAndCountAll({
    where: whereClause,
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

const getContentById = async (id) => {
  return await Content.findByPk(id, {
    include: [
      {
        model: Program
      },
      {
        model: Image,
        as: 'Images'
      }
    ]
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
