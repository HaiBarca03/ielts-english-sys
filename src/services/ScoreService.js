const { Score, User, Content } = require('../models')

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

module.exports = {
  createScore,
  getScoreById,
  updateScore
}
