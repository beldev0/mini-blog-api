const { z } = require('zod')

const userValidator = {
    create : z.object({
        email: z.email().trim(),
        username: z.string().trim().min(3, "Username too short")
    }),
    update : z.object({
        email: z.email().trim().optional(),
        username: z.string().trim().min(3, "Username too short").optional()
    })
}

module.exports = userValidator