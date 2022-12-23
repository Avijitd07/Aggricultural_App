const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    companyPassword: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 15
    },

}, { timestamps: true });


module.exports = mongoose.model('Admin', adminSchema);
