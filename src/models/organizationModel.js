const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({

    organizationName: {
        type: String,
        required: true,
        trim: true
    },

    establishment: {
        type: Number,
        required: true,
        trim: true
    },

    otherresource: {
        type: String,
        required: true,
        trim: true
    }

}, {timestamps: true });


module.exports = mongoose.model('Organization', organizationSchema);