const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const expres = require('express')
const userRouteHandler = require('./routes/user.routes.js')
const postRouteHandler = require('./routes/post.routes.js')
const commentRouteHandler = require ('./routes/comment.route.js')
const authRouteHandler = require('./routes/auth.route.js')
const globalErrorHandler = require('./middlewares/error.middleware.js')
const app = expres()

app.use(expres.json())

app.use('/users', userRouteHandler)

app.use('/posts', postRouteHandler)

app.use('/comments', commentRouteHandler)

app.use('/auth', authRouteHandler)

app.all('/{*any}', (req, res) => {
    res.status(404).json({"succes":false, error:["URL NOT FOUND"]})
})

app.use(globalErrorHandler)

app.listen(3000)