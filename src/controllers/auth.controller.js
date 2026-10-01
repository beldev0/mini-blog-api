function authControllerFactory(authService) {
    return {
        register: async (req, res, next) => {

            try {
                const { refreshToken, ...data } = await authService.register(req.body, req.ip)
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    secure: process.env.ENVIRONNEMENT == 'production',
                    httpOnly: true,
                    sameSite: 'Lax'
                })
                return res.status(201).json({ "success": true, data: data })
            } catch (err) { next(err) }
        },

        login: async (req, res, next) => {
            try {
                const result = await authService.login(req.body, req.ip)
                if (result) {
                    const { refreshToken, ...data } = result
                    res.cookie('refreshToken', refreshToken, {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        secure: process.env.ENVIRONNEMENT == 'production',
                        httpOnly: true,
                        sameSite: 'Lax'
                    })
                    return res.json({ "success": true, data: [data] })
                }
                return res.status(400).json({ "success": false, error: ["Invalid credentials"] })
            } catch (err) { next(err) }
        },

        refresh: async (req, res, next) => {
            try {
                let oldRefresh = req.cookies?.refreshToken

                if (!oldRefresh) {
                    return res.status(401).json({ "success": false, error: ["Include cookies !"] })
                }

                const result = await authService.refresh(oldRefresh, req.ip)

                if (!result.success) {
                    return res.status(401).json({ "success": false, error: [result.error] })
                }
                const { refreshToken, accessToken } = result
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    secure: process.env.ENVIRONNEMENT == 'production',
                    httpOnly: true,
                    sameSite: 'Lax'
                })
                res.json({ "success": true, data: { accessToken } })
            } catch (err) {
                next(err)
            }
        },

        logout: async (req, res, next) => {
            try {
                let oldRefresh = req.cookies?.refreshToken
                if (!oldRefresh) {
                    return res.status(401).json({ "success": false, error: ["Include cookies !"] })
                }

                const successLogout = await authService.logout(oldRefresh)
                if (successLogout) {
                    res.clearCookie('refreshToken')
                    return res.json({ "success": true, message: "Successfully logout !" })
                }
                res.clearCookie('refreshToken')
                return res.json({ "success": false, error: ["Invalid refresh token given"] })

            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = authControllerFactory