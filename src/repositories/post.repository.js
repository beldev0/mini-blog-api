const pool = require('./../db/db.js')

const postRepository = {
    getAllPosts: async ({limit = 10, offset = 0} = {}) => {
        const result = await pool.query(`
            SELECT p.id, title, body, published, p.created_at, user_id, username
            FROM posts p
            INNER JOIN users u
            ON p.user_id = u.id
            LIMIT $1 OFFSET $2
            `, [limit, offset])
        return result.rows
    },

    getPostById: async (id) => {
        const result = await pool.query(`
            SELECT p.id, title, body, published, p.created_at, user_id, username
            FROM posts p
            INNER JOIN users u
            ON p.user_id = u.id
            WHERE p.id = $1
            `, [id])
        return result.rows[0] ?? null
    },

    getPostByUser: async (user_id) => {
        const result = await pool.query(`
            SELECT p.id, title, body, published, p.created_at, user_id, username
            FROM posts p
            INNER JOIN users u
            ON p.user_id = u.id
            WHERE user_id = $1
        `, [user_id])
        return result.rows
    },

    deletePost : async (id) => {
        const result = await pool.query(`
            DELETE FROM posts 
            WHERE id = $1
            `, [id])
        return result.rowCount
    },

    editPost : async (id, { title, body, published }) => {
        const result = await pool.query(`
            UPDATE posts
            SET title = COALESCE($1, title),
                body  = COALESCE($2, body),
                published = COALESCE($3, published),
                updated_at = NOW()
            WHERE id = $4 RETURNING id, title, body, published, created_at, user_id
        `, [title ?? null, body ?? null, published ?? null, id])

        return result.rows[0] ?? null
    },

    createPost :  async ({ title, body, user_id, published = false}) => {
        const result = await pool.query(`
            INSERT INTO posts (title, body, published, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, body, published, created_at, user_id
            `, [title, body, published, user_id])
        
        return result.rows[0]
    }
}

module.exports = postRepository