const { z } = require('zod')

const commentValidator = z.object({
    body : z.string().min(3, "Comment is too short. 3 chars min required"),
    post_id : z.int().positive("Post ID can't be negative"),
    user_id : z.int().positive("User ID can't be negative")
})

module.exports = commentValidator