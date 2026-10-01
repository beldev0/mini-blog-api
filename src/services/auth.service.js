const jwtUtils = require('./../utils/generateJWT.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function authServiceFactory(userRepository, refreshTokenRepository) {
    return {
        register: async (data, ip) => {
            const hashPassword = await bcrypt.hash(data.password, 10)
            data.password = hashPassword
            const user = await userRepository.createUser(data)
            console.log(user);

            const jti = jwtUtils.getJTI()
            const refreshToken = jwtUtils.generateSignRefreshToken(user, jti)
            const tokenHash = jwtUtils.hashToken(refreshToken)
            await refreshTokenRepository.createRefreshToken({ ...user, jti, ip, tokenHash })
            const accessToken = jwtUtils.generateAccessToken(user)
            return { user, accessToken, refreshToken }

        },

        login: async (data, ip) => {
            const user = await userRepository.getUserByEmail(data.email)
            
            if (!user) {
                return null
            }
            const correctPassword = await bcrypt.compare(data.password, user.password)
            delete user['password']
            console.log(user);

            if (correctPassword) {
                const jti = jwtUtils.getJTI()
                const refreshToken = jwtUtils.generateSignRefreshToken(user, jti)
                const tokenHash = jwtUtils.hashToken(refreshToken)
                await refreshTokenRepository.createRefreshToken({ ...user, jti, ip, tokenHash })
                const accessToken = jwtUtils.generateAccessToken(user)
                return { user, accessToken, refreshToken }
            }
            return null
        },

        refresh: async (token, ip) => {
            let decoded;
            try {
               decoded = jwt.decode(token, process.env.REFRESH_TOKEN_SECRET)
            } catch (err) {
                return { "success": false, error: "Token already expired" }
            }
            console.log(decoded);
            let { id, email, username } = decoded
            const payload = {id, email, username }
            const tokenLine = await refreshTokenRepository.getTokenLine(jwtUtils.hashToken(token))
            
            if (!tokenLine) {
                return { "success": false, error: "Invalid token" }
            }
            if (tokenLine.revokedat) {
                return { "success": false, error: "Token already revoked" }
            }

            await refreshTokenRepository.revokedToken(tokenLine.id)

            const jti = jwtUtils.getJTI()
            const refreshToken = jwtUtils.generateSignRefreshToken(payload, jti)
            const tokenHash = jwtUtils.hashToken(refreshToken)
            await refreshTokenRepository.createRefreshToken({ id, jti, ip, tokenHash })

            const accessToken = jwtUtils.generateAccessToken(payload)
            return { 'success': true, accessToken, refreshToken }

        }

    }
}

module.exports = authServiceFactory