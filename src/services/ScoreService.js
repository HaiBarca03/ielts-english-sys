const { Score, User, Content, Class } = require('../models')

const createScore = async (data) => {
  const newScore = await Score.create(data)
  return newScore
}

const getScoreById = async (score_id) => {
  return await Score.findByPk(score_id)
}

const updateScore = async (score_id, data) => {
  await Score.update(data, { where: { score_id } })
  return await Score.findByPk(score_id)
}

const getScoreByUser = async (user_id, page = 1, limit = 10, type) => {
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const whereClause = { user_id }

  if (type) whereClause['$Content.type$'] = type

  const { count, rows } = await Score.findAndCountAll({
    where: whereClause,
    offset,
    limit: parseInt(limit),
    include: [
      {
        model: Content,
        attributes: ['content_id', 'title', 'type']
      },
      {
        model: Class,
        attributes: ['class_id', 'name']
      }
    ],
    order: [['date', 'DESC']]
  })

  return {
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    items: rows
  }
}

const getScoresByClassId = async (class_id, { page = 1, limit = 10, type }) => {
  try {
    const offset = (page - 1) * limit

    const whereClause = { class_id }

    if (type) {
      whereClause.type = type
    }

    const { count, rows } = await Score.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      include: [
        {
          model: Content,
          attributes: ['content_id', 'title', 'type'],
          required: true,
          where: type ? { type } : {}
        },
        {
          model: Class,
          where: { class_id },
          attributes: ['class_id', 'name'],
          required: true
        }
      ],
      order: [['date', 'DESC']]
    })

    return {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      items: rows
    }
  } catch (error) {
    throw new Error('Error fetching scores: ' + error.message)
  }
}

const deleteScore = async (score_id) => {
  try {
    const deletedScore = await Score.destroy({
      where: { score_id }
    })

    if (!deletedScore) {
      throw new Error('Score not found')
    }

    return { message: 'Score deleted successfully' }
  } catch (error) {
    throw new Error('Error deleting score: ' + error.message)
  }
}

module.exports = {
  createScore,
  getScoreById,
  updateScore,
  getScoreByUser,
  getScoresByClassId,
  deleteScore
}
