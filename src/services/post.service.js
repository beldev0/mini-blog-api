function postServiceFactory(postRepository, commentRepository) {
    return {
        getAllPosts : async ( ) => {
            const result = await postRepository.getAllPosts()
            return result
        },

        getPostById : async (id) => {
            const result = await postRepository.getPostById(id)
            if (result) {
                const commments = await commentRepository.getPostComment(id)
                return { post:result, commments }
            }
            return result
        },

        getPostByUser : async (user_id) => {
            const result = await postRepository.getPostByUser(user_id)
            return result
        },

        deletePost : async (id) => {
            const result = await postRepository.deletePost(id)
            return result
        },

        editPost : async (id, data) => {
            const result = await postRepository.editPost(id, data)
            return result
        },

        createPost :  async (data) => {
            const result = await postRepository.createPost(data)
            return result
        },

        getPostComment :  async (id) => {
            const post = await postRepository.getPostById(id)
            if(post) {
                const commments = await commentRepository.getPostComment(id)
                return commments
            }
            return null
        }
    }
}

module.exports = postServiceFactory