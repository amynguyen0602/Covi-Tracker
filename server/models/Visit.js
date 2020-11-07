const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VisitSchema = new Schema({
    date: Date,
    time: Date,
    lat: String,
    lng: String,
    place: String,
    province: String,
    city: String,
    country: String
});

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;