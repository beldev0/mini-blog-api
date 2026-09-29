const generateJWT = require('./../utils/generateJWT.js')
const bcrypt = require('bcrypt')

function authServiceFactory(userRepository) {
    return {
        register : async (data) => {
            const hashPassword = await bcrypt.hash(data.password, 10)            
            data.password = hashPassword
            const user = await userRepository.createUser(data)            
            const token = generateJWT(user)
            console.log({user, token});
            
            return {user, token}
        },

        login : async (data) => {
            const user = await userRepository.getUserByEmail(data.email)            
            if (!user) {
                return null
            }
            const correctPassword = await bcrypt.compare(data.password, user.password)
            if(correctPassword) {
                const token = generateJWT(user)
                return {user, token}
            }
            return null
        }

    }
}

module.exports = authServiceFactory