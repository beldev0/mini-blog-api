const pool = require('./../db/db.js')

const userRepository = {
    getAllUsers: async ({ limit = 50, offset = 0 } = {}) => {
        const result = await pool.query("SELECT id, username, email, created_at FROM users LIMIT $1 OFFSET $2", [limit, offset])
        return result.rows
    },

    getUserById: async (id) => {
        const result = await pool.query(`
            SELECT id, username, email, created_at
            FROM users
            WHERE id = $1`, [id])
        return result.rows[0] ?? null
    },

    createUser: async ({ email, username }) => {
        const result = await pool.query(`
            INSERT INTO users (email, username) VALUES ($1, $2) RETURNING id, email, username, created_at
        `, [email, username])
        return result.rows[0]
    },

    updateUser: async ({ email, username }, id) => {
        const result = await pool.query(`
                UPDATE users 
                SET email = COALESCE($1, email),
                    username = COALESCE($2, username)
                WHERE id = $3 RETURNING id, username, created_at, email`, [email ?? null, username ?? null, id])

        return result.rows[0] ?? null
    },

    deleteUser: async (id) => {
        const result = await pool.query(`
            DELETE FROM users
            WHERE id = $1
            `, [id])
        return result.rowCount
    },

    getUserByEmail: async (email) => {
        const result = await pool.query(`
            SELECT id, email, username, created_at
            FROM users
            WHERE email = $1`, [email])
        
        return result.rows[0] ?? null
    },

    countUsers: async () => {
        const result = await pool.query(`SELECT COUNT(*) as count FROM users`)
        return result.rows[0].count
    }

}


module.exports =  userRepository