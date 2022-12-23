const propertyModel = require('../models/propertyModel');
const ObjectId = require('mongoose').Types.ObjectId;


const isValid = function (val) {
    if (typeof val === "undefined" || val === null) return false;
    if (typeof val === "string" && val.trim().length === 0) return false;

    return true;
};
const isValidBody = function (val) {
    return Object.keys(val).length > 0;
};
const isValidOwnership = function (val) {
    return ["owned", "lease"].indexOf(val) !== -1;
};



const createProperty = async function (req, res) {

    try {
        let body = req.body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }

        let { organizationId, ownership, purchaseDate, leasePeriod, fieldArea, propertyLocation } = body;

        if (!isValid(organizationId)) {
            return res.status(400).send({ status: false, message: "organizationId is Required" })
        }
        if (!isValid(ownership)) {
            return res.status(400).send({ status: false, message: "ownership is Required" })
        }
        if (!isValid(purchaseDate)) {
            return res.status(400).send({ status: false, message: "purchaseDate is Required" })
        }
        if (!isValid(leasePeriod)) {
            return res.status(400).send({ status: false, message: "leasePeriod is Required" })
        }
        if (!isValid(fieldArea)) {
            return res.status(400).send({ status: false, message: "fieldArea is Required" })
        }
        if (!isValid(propertyLocation)) {
            return res.status(400).send({ status: false, message: "propertyLocation is Required" })
        }

        if (!ObjectId.isValid(organizationId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });

        if (!isValidOwnership(ownership)) return res.status(400).send({ status: false, message: "please put valid ownership" });


        let propertyData = await propertyModel.create(body);
        return res.status(201).send({ status: true, data: propertyData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getProperty = async function (req, res) {

    try {
        let organizationId = req.params.organizationId;

        if (!ObjectId.isValid(organizationId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });

        let findOrganization = await propertyModel.findOne({organizationId:organizationId}).populate('organizationId');
        if (!findOrganization) return res.status(400).send({ status: false, message: 'Property is not Found' });

        return res.status(200).send({ status: true, data: findOrganization });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createProperty, getProperty };