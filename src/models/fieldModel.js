const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const fieldSchema = new mongoose.Schema({

    regionId: {
        type: ObjectId,
        ref: 'Region',
        required: true,
        trim: true
    },
    propertyId: {
        type: ObjectId,
        ref: 'Property',
        required: true,
        trim: true
    },
    farmsize: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    croprecords:{
        type: String,
        required: true,
        trim: true
    }


}, { timestamps: true});

module.exports = mongoose.model('Field', fieldSchema);