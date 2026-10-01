const jwt = require("jsonwebtoken")
const crypto = require('crypto')

const jwtUtils =
{
    generateAccessToken(payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
        return token
    },

    getJTI() {
        return crypto.randomBytes(16).toString('hex')
    },

    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex')
    },

    generateSignRefreshToken(user, jti) {
        const payload = { ...user, jti }
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    }

}

module.exports = jwtUtils