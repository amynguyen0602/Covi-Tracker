const chatbot = require('../chatbot/chatbot')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hi')
  })

  app.post('/api/bot_text', async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.parameters)
    res.send(responses[0].queryResult)
  })

  app.post('/api/bot_event', async (req, res) => {
    let responses = await chatbot.eventQuery(req.body.event, req.body.parameters)
    res.send(responses[0].queryResult)
  })
}
