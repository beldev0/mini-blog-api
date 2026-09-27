const pool = require('./../db/db.js')

const commentRepository = {
    getPostComment : async (id) => {
        const result = await pool.query(`
            SELECT c.id, body, post_id, user_id, username, c.created_at
            FROM comments c
            INNER JOIN users u
            ON c.user_id = u.id
            WHERE post_id = $1
            `, [id])
        
        return result.rows
    },

    createComment : async ({body, user_id, post_id}) => {
        const result = await pool.query(`
            INSERT INTO comments (body, user_id, post_id) VALUES ($1, $2, $3)
            RETURNING id, body, user_id, post_id, created_at
            `, [body, user_id, post_id])
        return result.rows[0]
    },

    deleteComment : async (id) => {
        const result = await pool.query(`
            DELETE FROM comments WHERE id = $1
            `, [id])
        return result.rowCount 
    }
}


module.exports = commentRepository