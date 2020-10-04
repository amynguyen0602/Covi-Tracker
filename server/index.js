const express = require('express')
const bodyParser = require('body-parser')
//const keys = require('./config/keys')

const app = express()
app.use(bodyParser.json())

require('./routes/chatbotRoutes')(app)
require('./routes/selfReportRoutes')(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT)
