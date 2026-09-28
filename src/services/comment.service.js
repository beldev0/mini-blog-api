function commentServiceFactory(commentRepository, postRepository) {
    return {
        createComment : async (data) => {
            const { post_id } = data
            const post = await postRepository.getPostById(post_id)
            if (post ) {
                const comment = await commentRepository.createComment(data)
                return comment
            }
            return post // post is null in this case
        },

        deleteComment : async (id) => {
            const result = await commentRepository.deleteComment(id)
            return result
        },

        getPostComment : async (id) => {
            const post = postRepository.getPostById(post_id)
            if (post ) {
                const result = await commentRepository.getPostComment(id)
                return result
            }
            return post // post is null in this case
        }
    }
}

module.exports = commentServiceFactory