const pool = require('./../db/db.js')

function refreshTokenRepoFactory() {
    return {
        async createRefreshToken({ user_id, jti, tokenHash ,revokedAt=false, ip }) {
            const result = await pool.query(`
                INSERT INTO refreshToken (user_id, jti, tokenHash, revokedAt, ip) VALUES ($1, $2, $3, $4, $5)  
                `, [user_id, jti, tokenHash, revokedAt, ip])
            return result.rows[0]
        },
        async getTokenLine(tokenHash) {
            const result = await pool.query(`
                SELECT * FROM refreshToken WHERE tokenHash = $1
                `, [tokenHash])
            return result.rows[0] ?? null
        },
        async revokedToken(id) {
            const result = await pool.query(`UPDATE refreshToken SET revokedAt = TRUE WHERE id = $1`, [id])
            return result.rowCount
        }
    }
}

module.exports = refreshTokenRepoFactory