const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')
const asyncHandler = require('express-async-handler')

// Register User
//Accress Public
// Route: /api/auth/register

const register = asyncHandler( async (req, res)=> {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // check user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name, 
        email,
        password : hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name : user.name,
            email: user.password,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }

} )


// Login User
//Accress Public
// Route: /api/auth/login
const login = asyncHandler( async (req, res)=> {
    const {email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Please include all the fields')
    }

    // Check user from database
    const user = await User.findOne({ email })

     if(user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
     } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
  
} )


// Generate Jsonwebtoken
const generateToken = (id)=> {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}

module.exports = {
    register, login
}