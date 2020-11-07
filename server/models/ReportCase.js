const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportCaseSchema = new Schema({
    confirmedDate: String,
    visits: [{ type: Schema.Types.ObjectId, ref: 'Visit' }]
});

const ReportCase = mongoose.model('ReportCase', ReportCaseSchema);

module.exports = ReportCase;