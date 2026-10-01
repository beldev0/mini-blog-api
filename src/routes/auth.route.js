const router = require('express').Router()

const userValidation = require('./../validators/user.validator.js')
const validatorMiddleware = require('./../middlewares/validator.middleware.js')

const userRepository = require('./../repositories/user.repository.js')
const refreshTokenRepositoryFactory = require('./../repositories/refreshToken.repository.js')
const refreshTokenRepo =  refreshTokenRepositoryFactory()
const authServiceFactory = require('./../services/auth.service.js')
const authControllerFactory = require('./../controllers/auth.controller.js')

const authService = authServiceFactory(userRepository, refreshTokenRepo)
const authController = authControllerFactory(authService)

router.post('/register', validatorMiddleware(userValidation.create) ,authController.register)
router.post('/login',validatorMiddleware(userValidation.login), authController.login )
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)

module.exports = router