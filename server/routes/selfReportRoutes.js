const Visit = require('../models/Visit');
const ReportCase = require('../models/ReportCase');

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
        const province = placeDetails[placeDetails.length - 2]
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
    res.send(reportCases)
  })
}
