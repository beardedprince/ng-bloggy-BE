const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/api')
const config = require('./config/db')


app.use(bodyParser.json())
app.use(cors())

app.use('/api', route)

app.get('/', (req, res) => {
    res.send('ng-bloggy backend currently brewing 🔥🔥✌')
})

app.listen(port, function() {
    console.log( `app listening on port ${port}`)
})