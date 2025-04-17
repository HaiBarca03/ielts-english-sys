const scoreService = require('../services/ScoreService')
const UserService = require('../services/UserService')
const ContentService = require('../services/ContentService')
const ClassService = require('../services/ClassService')

const createScore = async (req, res) => {
  try {
    const { user_id, content_id, class_id, score, date } = req.body

    if (!user_id || !content_id || typeof score !== 'number' || !date) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const user = await UserService.findUserById(user_id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const content = await ContentService.getContentById(content_id)
    if (!content) {
      return res.status(404).json({ message: 'Content not found' })
    }

    const checkClass = await ClassService.getClassInfo(class_id)
    if (!checkClass) {
      return res.status(404).json({ message: 'Class not found' })
    }

    if (score < 0 || score > 10) {
      return res.status(400).json({ message: 'Score must be between 0 and 10' })
    }

    const data = {
      user_id,
      class_id,
      content_id,
      score,
      date
    }

    const newScore = await scoreService.createScore(data)

    res.status(201).json(newScore)
  } catch (err) {
    console.error('Error creating score:', err)
    res.status(500).json({ message: err.message })
  }
}

const updateScore = async (req, res) => {
  try {
    const { score_id } = req.params
    const { user_id, content_id, score, date, class_id } = req.body

    const existingScore = await scoreService.getScoreById(score_id)
    if (!existingScore) {
      return res.status(404).json({ message: 'Score not found' })
    }

    if (user_id) {
      const user = await UserService.findUserById(user_id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
    }

    if (content_id) {
      const content = await ContentService.getContentById(content_id)
      if (!content) {
        return res.status(404).json({ message: 'Content not found' })
      }
    }

    const checkClass = await ClassService.getClassInfo(class_id)
    if (!checkClass) {
      return res.status(404).json({ message: 'Class not found' })
    }

    if (typeof score === 'number' && (score < 0 || score > 10)) {
      return res.status(400).json({ message: 'Score must be between 0 and 10' })
    }

    const updatedData = {
      ...(user_id && { user_id }),
      ...(content_id && { content_id }),
      ...(class_id && { class_id }),
      ...(typeof score === 'number' && { score }),
      ...(date && { date })
    }

    const updatedScore = await scoreService.updateScore(score_id, updatedData)

    res.status(200).json(updatedScore)
  } catch (err) {
    console.error('Error updating score:', err)
    res.status(500).json({ message: err.message })
  }
}

const getScoreByUser = async (req, res) => {
  try {
    const { user_id } = req.params
    const { page, limit, type } = req.query

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' })
    }
    if (user_id) {
      const user = await UserService.findUserById(user_id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
    }

    const scores = await scoreService.getScoreByUser(user_id, page, limit, type)

    res.status(200).json(scores)
  } catch (err) {
    console.error('Error fetching scores:', err)
    res.status(500).json({ message: err.message })
  }
}

const getScoresByClass = async (req, res) => {
  try {
    const { class_id } = req.params
    const { page, limit, type } = req.query

    if (!class_id) {
      return res.status(400).json({ message: 'class_id is required' })
    }

    const checkClass = await ClassService.getClassInfo(class_id)
    if (!checkClass) {
      return res.status(404).json({ message: 'Class not found' })
    }

    const scores = await scoreService.getScoresByClassId(class_id, {
      page,
      limit,
      type
    })

    if (scores.items.length === 0) {
      return res.status(404).json({ message: 'No scores found for this class' })
    }

    res.status(200).json(scores)
  } catch (err) {
    console.error('Error fetching scores:', err)
    res.status(500).json({ message: err.message })
  }
}

const deleteScoreById = async (req, res) => {
  try {
    const { score_id } = req.params

    if (!score_id) {
      return res.status(400).json({ message: 'score_id is required' })
    }

    const result = await scoreService.deleteScore(score_id)

    res.status(200).json(result)
  } catch (err) {
    console.error('Error deleting score:', err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  createScore,
  updateScore,
  getScoreByUser,
  getScoresByClass,
  deleteScoreById
}
