const cropModel = require('../models/cropModel');
const ObjectId = require('mongoose').Types.ObjectId;



const isValid = function (val) {
    if (typeof val === "undefined" || val === null) return false;
    if (typeof val === "string" && val.trim().length === 0) return false;

    return true;
};
const isValidBody = function (val) {
    return Object.keys(val).length > 0;
};

const createCrop = async function (req, res) {

    try {
        let body = req.body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }

        let { cropFieldId, cropName, categories, nutrition, profit } = body;


        if (!isValid(cropFieldId)) {
            return res.status(400).send({ status: false, message: "cropFieldId is Required" });
        }
        if (!isValid(cropName)) {
            return res.status(400).send({ status: false, message: "cropName is Required" });
        }
        if (!isValid(categories)) {
            return res.status(400).send({ status: false, message: "categories is Required" });
        }
        if (!isValid(nutrition)) {
            return res.status(400).send({ status: false, message: "nutrition is Required" });
        }
        if (!isValid(profit)) {
            return res.status(400).send({ status: false, message: "profit is Required" });
        }

        if (!ObjectId.isValid(cropFieldId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });

        let cropData = await cropModel.create(body);
        return res.status(201).send({ status: true, data: cropData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

const getCrop = async (req, res) => {

    try {

        let cropData = await cropModel.find().populate({ path: 'cropFieldId', populate: [{ path: 'cropPropertyId', model: 'CropProperty' }] })
        if (finddata.length == 0) return res.status(400).send({ status: false, message: 'crop data is not Found' });
        res.status(200).send({ status: true, data: cropData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

module.exports = { createCrop, getCrop };


