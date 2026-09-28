function postControllerFactory(postService) {
    return {
        getAllPosts : async (req, res, next) => {
            try {   
                const posts = await postService.getAllPosts()
                res.json({ "success":true, data:posts })
            } catch (err) {
                next(err)
            }
        },

        getPostById : async (req, res, next) => {
            try {
                const post = await postService.getPostById(req.params.id)
                if(post) {
                    return res.json({"success":true, data:[post]})
                }
                return res.status(404).json({"success":false, "error": ["Post not found"]})
            } catch (err) {
                next(err)
            }
        },

        createPost : async (req, res, next) => {
            console.log("body :" + req.body);
            
            try {   
                const post = await postService.createPost(req.body)
                return res.status(201).json({"success":true, data:[post]})
            } catch(err) {
                next(err)
            }
        },

        editPost :  async (req, res, next) => {
            try {
                if (!req.body.title && !req.body.body) {
                    return res.status(400).json({"success":false, error:["Update fields are missing"]})
                }
                const post = await postService.editPost(req.params.id, req.body)
                if (post) {
                    return res.json({"success":true, data:[post]})
                }
                return res.status(404).json({"success":false, error:["Post not found"]})
            } catch (err) {
                next(err)
            }
        },

        deletePost : async (req, res, next) => {
            try {
                const delCount = await postService.deletePost(req.params.id)
                if (delCount) {
                    return res.sendStatus(204)
                }
                return res.json({"success":false, error:["Post not found"]})
            } catch (err) {

            }
        },

        getPostComment :  async (req, res, next) => {
            try {
                const comments = await postService.getPostComment(req.params.id)
                if(comments) {
                    return res.json({"success":true, data:comments})
                }
                return res.status(404).json({"success":false, error:["Post not found"]})
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = postControllerFactory