function commentControllerFactory(commentService) {
    return {
        createComment: async (req, res, next) => {
            try {
                const comment = await commentService.createComment(req.body)
                if (comment) {
                    return res.status(201).json({ "success": true, data: [comment] })
                }
                return res.status(404).json({ "success": false, error: ["Post not found"] })
            } catch (err) {
                next(err)
            }
        },

        deleteComment: async (req, res, next) => {
            try {
                const result = await commentService.deleteComment(req.params.id)
                if (result) {
                    return res.sendStatus(204)
                }
                return res.status(404).json({ "success": false, error: ["Comment not found"] })
            } catch (err) {
                next(err)
            }
        },

        getPostComment: async (req, res, next) => {
            try {
                const result = await commentService.getPostComment(req.params.id)
                if (result) {
                    return res.json({'success':true, data:[result]})
                }
                return res.status(404).json({'success':false, error:["Post not found"]})
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = commentControllerFactory