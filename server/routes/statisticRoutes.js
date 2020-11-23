const https = require('https');

module.exports = (app) => {
  app.get('/api/statistic/summary', (req, res) => {
      https.get('https://api.covid19tracker.ca/summary', response => {
        var data = ''
        response.on("data", d => {
            data += d
        })
        response.on("end", () => {
            const statData = JSON.parse(data)
            res.send(statData)
        })
    }) 
  })

  app.get('/api/statistic/province/:provinceCode', (req, res) => {
    const { provinceCode } = req.params
    https.get(`https://api.covid19tracker.ca/reports/province/${provinceCode}`, response => {
        var data = ''
        response.on("data", d => {
            data += d
        })
        response.on("end", () => {
            const statData = JSON.parse(data)
            res.send(statData)
        })
  }) 
})

  app.get('/api/provinces', (req, res) => {
      https.get('https://api.covid19tracker.ca/provinces', response => {
        var data = ''
        response.on("data", d => {
            data += d
        })
        response.on("end", () => {
            const statData = JSON.parse(data)
            res.send(statData)
        })
    })
  })
}
