"use strict"

const dialogflow = require('dialogflow')
const keys = require('../config/keys')
const structjson = require('structjson')
const projectID = keys.googleProjectID
const credentials = {
  client_email: keys.googleClientEmail,
  private_key: keys.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectID, credentials})
const sessionPath = sessionClient.sessionPath(projectID, keys.dialogflowSessionID);

module.exports = {
    textQuery: async (text, params = {}) => {
        let self = module.exports
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                text,
                languageCode: keys.dialogflowSessionLanguageCode,
              },
            },
            queryParams: {
                payload: {
                    data: params
                }
            }
          }
        
          let responses = await sessionClient.detectIntent(request);
          responses = await self.handleActions(responses)
          return responses
    }, 
    eventQuery: async (event, params = {}) => {
        let self = module.exports
        const request = {
            session: sessionPath,
            queryInput: {
              event: {
                name: event,
                parameters: structjson.jsonToStructProto(params),
                languageCode: keys.dialogflowSessionLanguageCode,
              },
            }
          }
        
          let responses = await sessionClient.detectIntent(request);
          responses = await self.handleActions(responses)
          return responses
    },

    handleActions: (responses) => {
        return responses
    }
}