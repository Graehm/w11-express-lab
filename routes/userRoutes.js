const express = require('express')
const router = express.Router()// just the router part becuase we want to isolate just the router parts from express
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.post('/logout', userController.auth, userController.logoutUser)

module.exports = router