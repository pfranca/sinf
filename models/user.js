var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema(
    {
        name: String,
        password: String,
        address: String,
        city: String,
        areaCode: String,
        fiscalNr: Number,
        country: String,
        currency: String,
        body: String,
        cart: [{id: String, qty: Number}],
    },
    {
        timestamps: true
    });

user.pre('save', function() {
    var user = this;
    if (!user.isModified('password')) return next();
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

user.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', user);
