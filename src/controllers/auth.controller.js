function authControllerFactory(authService) {
    return {
        register : async (req, res, next) => {
            // console.log(req.body);
            
            try {   
                const user = await authService.register(req.body)
                console.log(user);
                
                return res.status(201).json({"success":true, data:user})
            } catch(err) { next(err) }
        },

        login : async (req, res, next) => {
            try {
                const user = await authService.login(req.body)
                if(user) {
                    return res.json({"success":true, data:[user]})
                }
                return res.status(400).json({"success":false, error:["Invalid credentials"]})
            } catch (err) { next(err) }
        }
    }
}

module.exports = authControllerFactory