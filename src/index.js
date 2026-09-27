const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const expres = require('express')
const userRouteHandler = require('./routes/user.routes.js')
const app = expres()

app.use(expres.json())

app.use('/users', userRouteHandler)

app.all('/{*any}', (req, res) => {
    res.status(404).json({"succes":false, error:["URL NOT FOUND"]})
})

app.listen(3000)