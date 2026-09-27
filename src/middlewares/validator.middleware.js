const validatorMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
        
        if(!result.success) {
            const errors = result.error.flatten().fieldErrors
            next({"code":"Validation Error", statusCode:400, error:errors})
        }
        req.body = result.data
        next()
    }
}

module.exports = validatorMiddleware