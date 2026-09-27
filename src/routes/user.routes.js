const express = require('express')
const router  = express.Router()
const userRepository = require('./../repositories/user.repository.js')
const userServiceFactory = require('./../services/user.service.js')
const userControllerFactory = require('./../controllers/user.controller.js')
const validatorMiddleware = require('./../middlewares/validator.middleware.js')
const userValidator = require('./../validators/user.validator.js')
const userService = userServiceFactory(userRepository)
const userController = userControllerFactory(userService)

router.get('', userController.getAllUsers)
router.post('', validatorMiddleware(userValidator.create) ,userController.createUser)
router.get('/:id', userController.getUserById)
router.delete('/:id', userController.deleteUser)
router.patch('/:id', validatorMiddleware(userValidator.update) ,userController.updateUser)

module.exports = router