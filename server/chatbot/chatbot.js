"use strict"

const dialogflow = require('dialogflow')
const keys = require('../config/keys')
const structjson = require('structjson')
const projectID = keys.googleProjectID
const sessionID = keys.dialogflowSessionID
const credentials = {
  client_email: keys.googleClientEmail,
  private_key: keys.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectID, credentials})

module.exports = {
    textQuery: async (text, userID, params = {}) => {
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
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
    eventQuery: async (event, userID, params = {}) => {
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
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