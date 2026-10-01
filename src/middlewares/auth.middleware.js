const jwt = require('jsonwebtoken')

function authChecker(req, res, next) {    
    const authorisationHeader = req.headers.authorization || ''
    // console.log(authorisationHeader);
    
    
    const [ scheme, token ] = authorisationHeader.split(' ')

    if(!scheme || !token) {
        return res.status(401).json({"success":false, "error":["Unauthorized. Missing information"]})
    }

    try {
        const users = jwt.decode(token, process.env.JWT_SECRET)   
        console.log(users);
             
        req.user = users
        next()
    } catch(err) {
        if (err.name == "TokenExpiredError") {
            return res.status(401).json({"success":false, "error":["Access token expired"]})
        } 
        return res.status(401).json({"success":false, "error":["Invalid token"]})
    }
}

module.exports = authChecker