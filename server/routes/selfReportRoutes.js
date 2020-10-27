module.exports = (app) => {
  app.post('/api/self_report', (req, res) => {
    // request body has SelfReport data
    res.send(req.body)
  })
}
