const { z } = require('zod')

const userValidator = {
    create : z.object({
        email: z.email().trim(),
        username: z.string().trim().min(3, "Username too short"),
        password : z.string().min(6, "Password is too short")
    }),
    update : z.object({
        email: z.email().trim().optional(),
        username: z.string().trim().min(3, "Username too short").optional()
    }),
    login : z.object({
        email : z.email().trim(),
        password : z.string()
    })
}

module.exports = userValidator