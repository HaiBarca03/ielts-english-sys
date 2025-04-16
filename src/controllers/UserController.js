const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
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

module.exports = {
  registerUser,
  loginUser
}
