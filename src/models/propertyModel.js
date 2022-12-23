const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const propertySchema = new mongoose.Schema({

    organizationId: {
        type: ObjectId,
        ref: 'Organization',
        required: true,
        trim: true
    },
    ownership: {
        type: String,
        enum: ["owned", "lease"],
        required: true,
        trim: true
    },
    purchaseDate: {
        type: String,
        required: true,
        trim: true
    },
    leasePeriod: {
        type: String,
        required: true,
        trim: true
    },
    fieldArea: {
        type: String,
        required: true,
        trim: true
    },
    propertyLocation: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);