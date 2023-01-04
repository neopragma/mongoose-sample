const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const CONNECTION_STRING = 'mongodb://localhost:27017/test'

app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', api)
app.use(express.static('static'))
app.use(morgan('dev'))
app.use(function (req, res) {
    const err = new Error('Not Found')
    err.status = 404
    res.json(err)
})

mongoose.connect(CONNECTION_STRING,
    { useNewUrlParser: true}
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
    console.log("Connected to MongoDB")
    app.listen(app.get('port'), function() {
        console.log(`Standup Notes API server is listening on port ${app.get('port')}`)
    })
})