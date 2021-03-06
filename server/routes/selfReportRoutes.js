const Visit = require('../models/Visit');
const ReportCase = require('../models/ReportCase');
const https = require('https');

module.exports = (app) => {
  app.post('/api/self_report', async (req, res) => {
    // request body has SelfReport data
    const visits = req.body.visits
    const confirmedDate = req.body.confirmedDate
    const reportCase = new ReportCase({
      confirmedDate,
      visits: []
    })
    var newCase = await ReportCase.create(reportCase)
    await visits.forEach(async visit => {
        const placeDetails = visit.place.split(",")
        const country = placeDetails[placeDetails.length - 1]
        const province = placeDetails[placeDetails.length - 2].trim().split(' ')[0]
        const city = placeDetails[placeDetails.length - 3]
        visit.country = country
        visit.province = province
        visit.city = city
        var newVisit = await Visit.create(visit)
        newCase.visits.push(newVisit)
        update = { visits: newCase.visits}
        updateCase = await ReportCase.findByIdAndUpdate({_id: newCase._id}, update, {
          new: true
        })
    })
    res.send(newCase)
  })

  app.get('/api/report_cases', async (req, res) => {
    const reportCases = await ReportCase.find().populate("visits")
    const reportCasesRecent = reportCases.filter(reportCase => {
      const confirmedDate = new Date(reportCase.confirmedDate).getTime() / (1000 * 60 * 60 * 24)
      const today = (new Date()).getTime() / (1000 * 60 * 60 * 24)
      return (today - confirmedDate <= 14)
    })
    res.send(reportCasesRecent)
  })

  app.get('/api/summary', (req, res) => {
      https.get('https://api.covid19tracker.ca/summary', response => {
        response.on("data", d => {
          res.send(d)
      })
    }) 
  })
}
