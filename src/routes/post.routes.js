const router = require('express').Router()

const validatorMiddleware = require('./../middlewares/validator.middleware.js')
const postValidator = require('./../validators/post.validator.js')

const controllerFactory = require('./../controllers/post.controller.js')
const serviceFactory = require('./../services/post.service.js')
const postRepository = require('./../repositories/post.repository.js')
const commentRepository = require('./../repositories/comment.repository.js')
const postService = serviceFactory(postRepository, commentRepository)
const postController = controllerFactory(postService)

router.get('', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.post('', validatorMiddleware(postValidator.create), postController.createPost)
router.patch('/:id', validatorMiddleware(postValidator.update), postController.editPost)
router.delete('/:id', postController.deletePost)
router.get('/:id/comments', postController.getPostComment)

module.exports = router