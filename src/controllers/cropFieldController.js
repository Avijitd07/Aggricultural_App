const cropFieldModel = require('../models/cropFieldModel');
const ObjectId = require('mongoose').Types.ObjectId;


const isValid = function (val) {
    if (typeof val === "undefined" || val === null) return false;
    if (typeof val === "string" && val.trim().length === 0) return false;

    return true;
};
const isValidBody = function (val) {
    return Object.keys(val).length > 0;
};

const createCropField = async (req, res) => {

    try {
        let body = req.body;

        const { cropPropertyId, pesticides, durationInnumber, weather } = body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }
        
        if (!isValid(cropPropertyId)) {
            return res.status(400).send({ status: false, msg: 'Please enter CropPropertyId' });
        }
        if (!isValid(pesticides)) {
            return res.status(400).send({ status: false, msg: 'Please enter pesticides' });
        }
        if (!isValid(durationInnumber)) {
            return res.status(400).send({ status: false, msg: 'Please enter DurationInnumber' });
        }
        if (!isValid(weather)) {
            return res.status(400).send({ status: false, msg: 'Please enter Weather' });
        }
        
        if (!ObjectId(cropPropertyId)) return res.status(400).send({ status: false, message: `${cropPropertyId} it's not valid CropPropertyId Please check Ones` })
        

        let cropFieldData = await cropFieldModel.create(body);

        res.status(201).send({ status: true, data: cropFieldData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

module.exports = { createCropField }