const https = require('https');

module.exports = (app) => {
    app.get('api/testingcentre', (req, res) => {
        https.get('https://services1.arcgis.com/B6yKvIZqzuOr0jBR/arcgis/rest/services/COVID19_Testing_Centres_in_Canada/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json', response => {
            console.log(response)
        })
    })
}

