const paginate = (model, options = {}) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const offset = (page - 1) * limit

      const { count, rows } = await model.findAndCountAll({
        ...options,
        offset,
        limit
      })

      res.paginatedResult = {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        items: rows
      }

      next()
    } catch (error) {
      console.error('Pagination error:', error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = paginate
