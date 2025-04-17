const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
const ContentService = require('../services/ContentService')
const imageService = require('../services/ImageService')
const { uploadToCloud } = require('../utils/cloudUpload')
const cloudinary = require('cloudinary').v2
const SECRET_KEY = process.env.JWT_SECRET

const registerUser = async (req, res) => {
  const { name, email, phone, password, role, gender, dob, address, school } =
    req.body
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existingUser = await UserService.findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserService.createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      gender,
      dob,
      address,
      school
    })

    if (req.files.images && req.files.images.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.images.map((file) => uploadToCloud(file))
      )
      const user_id = newUser.user_id
      if (!user_id) {
        throw new Error('Content ID is missing or invalid')
      }

      const dataImage = { user_id }
      await imageService.createImages(uploadedImages, dataImage)
    }

    return res
      .status(201)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' })
    }

    const user = await UserService.findUserByEmail(email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
        user_name: user.name,
        email: user.email,
        phone: user.phone
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    )

    return res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user_id = id
  try {
    const user = await UserService.findUserById(user_id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const userResponse = user.get({ plain: true })
    delete userResponse.password
    delete userResponse.created_at

    return res.status(200).json({ user: userResponse })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const getProfile = async (req, res) => {
  const user_id = req.user.user_id
  try {
    const user = await UserService.findUserById(user_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const userResponse = user.get({ plain: true })
    delete userResponse.password
    delete userResponse.created_at

    return res.status(200).json({ user: userResponse })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  if (req.user.role !== 'Admin' && req.user.user_id !== id) {
    throw new Error('Chỉ admin hoặc chính chủ mới có quyền truy cập')
  }

  try {
    const user = await UserService.findUserById(id)
    const userData = user.get({ plain: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (req.files && req.files.images && req.files.images.length > 0) {
      const imageIds = userData.Images?.map((item) => item.image_id) || []
      const publicId = userData.Images?.map((item) => item.public_id) || []
      if (publicId.length > 0) {
        await Promise.all(publicId.map((id) => cloudinary.uploader.destroy(id)))
      }
      if (imageIds.length > 0) {
        await imageService.deleteImagesFromDB(imageIds)
      }

      const uploadedImages = await Promise.all(
        req.files.images.map((file) => uploadToCloud(file))
      )
      const userId = userData.user_id
      const dataImage = { user_id: userId }
      await imageService.createImages(uploadedImages, dataImage)
    }

    await UserService.updateUser(id, updateData)

    const updatedUser = await UserService.findUserById(id)
    const userResponse = updatedUser.get({ plain: true })

    delete userResponse.password
    delete userResponse.created_at

    return res
      .status(200)
      .json({ message: 'User updated successfully', user: userResponse })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserService.findUserById(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await UserService.deleteUserById(id)

    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const getClassByUser = async (req, res) => {
  const { userId } = req.params
  try {
    const userClass = await UserService.getUserClasses(userId)

    return res.status(200).json({ userClass: userClass })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

const getContentForUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { type, page, limit } = req.query

    const userClasses = await UserService.getUserClasses(userId)

    if (!userClasses || userClasses.length === 0) {
      return res
        .status(404)
        .json({ message: 'User is not enrolled in any classes' })
    }

    const programId = userClasses[0].program_id

    const contentData = await ContentService.getContentsByProgram(
      programId,
      type,
      page,
      limit
    )

    return res.status(200).json({
      message: 'Content retrieved successfully',
      data: contentData
    })
  } catch (error) {
    console.error('Error retrieving content for user:', error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const getUserRoles = (req, res) => {
  try {
    const roles = UserService.getUserRoles()
    res.status(200).json({ roles })
  } catch (err) {
    console.error('Error fetching user roles:', err)
    res.status(500).json({ message: 'Failed to get roles' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getProfile,
  updateUser,
  deleteUser,
  getClassByUser,
  getContentForUser,
  getUserRoles
}
