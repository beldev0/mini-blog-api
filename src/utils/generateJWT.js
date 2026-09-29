const jwt = require("jsonwebtoken")

function generateJWT(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:'15m'})
    return token
}

module.exports = generateJWT