const router = require('express').Router()

const validatorMiddleware = require('./../middlewares/validator.middleware.js')
const commentValidator = require('./../validators/comment.validator.js')


const controllerFactory = require('./../controllers/comment.controller.js')
const commentRepository = require('./../repositories/comment.repository.js')
const postRepository = require('./../repositories/post.repository.js')
const serviceFactory = require('./../services/comment.service.js')

const commentService = serviceFactory(commentRepository, postRepository)
const commentController = controllerFactory(commentService)

router.get('', commentController.getPostComment)
router.post('', validatorMiddleware(commentValidator), commentController.createComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router