const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/ReportCase')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const app = express()
app.use(bodyParser.json())
app.use(cors())

require('./routes/chatbotRoutes')(app)
require('./routes/selfReportRoutes')(app)
require('./routes/statisticRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
