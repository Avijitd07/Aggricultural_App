const mongoose = require('mongoose');


const cropPropertySchema = new mongoose.Schema({

    cropcycle: {
        type: String,
        reuired: true,
        trim: true
    },

    season: {
        type: String,
        reuired: true,
        trim: true
    },
    months: {
        type: [String],
        reuired: true,
        trim: true
    }


}, { timestamps: true});

module.exports = mongoose.model('CropProperty', cropPropertySchema);