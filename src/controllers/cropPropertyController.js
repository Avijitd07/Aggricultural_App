const cropPropertyModel = require('../models/cropPropertyModel');


const isValid = function (val) {
    if (typeof val === "undefined" || val === null) return false;
    if (typeof val === "string" && val.trim().length === 0) return false;

    return true;
};
const isValidBody = function (val) {
    return Object.keys(val).length > 0;
};

const createCropProperty = async (req, res) => {

    try {
        let body = req.body

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }
        const { cropcycle, season, months } = body;

        if (!isValid(cropcycle)) {
            return res.status(400).send({ status: false, msg: 'Please enter cropcycle' });
        }
        if (!isValid(season)) {
            return res.status(400).send({ status: false, msg: 'Please enter season' });
        }
        if (!isValid(months)) {
            return res.status(400).send({ status: false, msg: 'Please enter months' });
        }
        

        let cropPropertyData = await cropPropertyModel.create(body);

        res.status(201).send({ status: true, data: cropPropertyData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

module.exports = { createCropProperty };