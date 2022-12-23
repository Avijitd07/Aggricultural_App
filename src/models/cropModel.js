const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const cropSchema = new mongoose.Schema({

    cropFieldId: {
        type: ObjectId,
        ref: 'CropField',
        required: true,
        trim: true
    },

    cropName: {
        type: String,
        required: true,
        trim: true
    },

    categories: {
        type: String,
        required: true,
        trim: true
    },

    nutrition: {
        type: [String],
        required: true,
        trim: true
    },

    profit :{
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Crop', cropSchema);