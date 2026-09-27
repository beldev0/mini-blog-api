function userControllerFactory(userService) {
    return {
        createUser : async (req, res, next) => {            
            try {
                const user = await userService.createUser(req.body)
                res.status(201).json({"sucess": true, "data": [user]})
            } catch (err) {
                next(err)
            }
        },

        updateUser : async (req, res, next) => {
            console.log(req.body);
            
            try {
                if (!Object.keys(req.body).length) {
                    return res.status(400).json({"success":false, error:["Update fields are required"]})
                }
                const updatedUser = await userService.updateUser(req.body, req.params.id)
                if (!updatedUser) {
                    return res.status(400).json({"success":false, error:["User not found"]})
                } 
                return res.status(200).json({"success":true, data:[updatedUser]})
            } catch (err) {
                next(err)
            }
        },

        deleteUser : async (req, res, next) => {
            try {   
                const delCount = await userService.deleteUser(req.params.id)
                if(delCount) {
                    return res.sendStatus(204)
                }
                return res.status(404).json({"success":false, error:["User not found"]})
            } catch(err) {
                next(err)

            }
        },

        getAllUsers : async (req, res, next) => {
            try {   
                const users = await userService.getAllUsers()
                return res.json({"success":true, data:users})
            } catch (err) {
                next(err)
            }
        },

        getUserById : async (req, res, next) => {
            try {
                const user = await userService.getUserById(req.params.id)
                if(user) {
                    return res.status(200).json({"success":true, data:[user]})
                }
                return res.status(404).json({"success":false, error:["User not found"]})
            } catch(err) {
                next(err)
            }
        }
    }
}

module.exports = userControllerFactory
