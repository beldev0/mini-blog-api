
function userServiceFactory(userRepository) {
    return {
        createUser : async (data) => {
            const user = await userRepository.createUser(data)
            return user
        },

        updateUser : async (data, id) => {
            const userUpdated = await userRepository.updateUser(data, id)
            return userUpdated
        },

        deleteUser : async (id) => {
            const rowCount = await userRepository.deleteUser(id)
            return rowCount
        },

        getAllUsers : async () =>  {
            const users = await userRepository.getAllUsers()
            return users
        },

        getUserById : async (id) => {
            const user = await userRepository.getUserById(id)
            return user
        },

        countUser: async () => {
            const totalCount = await userRepository.countUser()
            return totalCount
        }
    }
}

module.exports = userServiceFactory