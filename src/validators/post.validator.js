const { z } = require('zod')

const postValidator = {
    create : z.object({
        title : z.string().min(8, "Title is too short"),
        body: z.string().min(255, "255 characters is minimum required"),
        published: z.boolean().optional(),
        user_id : z.int().positive("ID can't be negative")
    }),

    update : z.object({
        title : z.string().min(8, "Title is too short").optional(),
        body: z.string().min(255, "255 characters is minimum required").optional()
    })
}

module.exports = postValidator