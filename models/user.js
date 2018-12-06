var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema(
    {
        name: String,
        address: String,
        city: String,
        areaCode: String,
        fiscalNr: Integer,
        country: String,
        currency: String,
        body: String
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('User', user);
