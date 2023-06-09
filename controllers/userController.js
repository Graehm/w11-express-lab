//containing all the functionality 
require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let access


exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ _id: data._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    if (access === true) {
      next()
    } else {
      throw new Error('Not Authd')
    }
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.getUsers = async (req, res) => {
  try {
    const foundUsers = await User.find({})
    // res.json(users)
    res.render('users/Index', {
      users: foundUsers
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// this line stats a try block and incating that the code inside the blick will be executed and 
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.json({ user, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
// 2. 
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send(('Invalid Login Attempt'))
    } else {
      access = true
      token = await user.generateAuthToken('5m')
      res.json({ user, token })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body) //this line retrieves the keys of the req.bpdy object and assings them to the updates variables 
    const user = await User.findOne({ _id: req.params.id }) //find the user in the database withthe given id
    updates.forEach(update => user[update] = req.body[update]) // iterate over the updates array to see what the prop
    await user.save()  //
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne()
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.logoutUser = async (req, res) => {
  try {
    access = false
    res.send('User successfully logged out!')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}



