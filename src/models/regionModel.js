const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const regionSchema = new mongoose.Schema({

    propertyId: {
        type: ObjectId,
        ref: 'Property',
        required: true,
        trim :true
    },
    state:{
        type: String,
        required: true,
        trim :true
    },
    agriculturalRegion: {
        type: String,
        required: true,
        trim :true
    },
    cropType: {
        type: [String],
        required: true,
        trim :true
    }


}, { timestamps: true});

module.exports = mongoose.model('Region', regionSchema);