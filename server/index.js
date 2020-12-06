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
require('./routes/testingCentreRoutes')(app)

if(process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
