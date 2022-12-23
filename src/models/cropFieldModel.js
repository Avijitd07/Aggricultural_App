const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cropFieldSchema = new mongoose.Schema({

    cropPropertyId: {
        type: ObjectId,
        ref: 'CropProperty',
        required: true,
        trim: true
    },

    pesticides: {
        type: String,
        required: true,
        trim: true
    },

    durationInnumber: {
        type: String,
        required: true,
        trim: true
    },

    weather: {
        type: String,
        required: true,
        trim: true
    }



}, { timestamps: true});

module.exports = mongoose.model('CropField', cropFieldSchema);