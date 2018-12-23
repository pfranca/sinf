var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema(
    {
        erpId: {
            type: String,
            unique: true,
        },
        name: String,
        price: Number,
        stock: Number,
        details: String
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Product', product);
