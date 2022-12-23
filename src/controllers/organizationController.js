const organizationModel = require('../models/organizationModel');
const ObjectId = require('mongoose').Types.ObjectId;


let nameRegex = /^[a-zA-Z\s][^|=]*$/;
let numberRegex = /^([0-9])+$/;


const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;

    return true;
};
const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};

const createOrganization = async function (req, res) {
    try {
        let body = req.body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }

        let { organizationName, establishment, otherresource } = body;


        if (!isValid(organizationName)) {
            return res.status(400).send({ status: false, message: "organizationName name is Required" });
        }
        organizationName = organizationName.trim();

        if (!isValid(establishment)) {
            return res.status(400).send({ status: false, message: "establishment is Required" });
        }
        establishment = establishment.trim();

        if (!isValid(otherresource)) {
            return res.status(400).send({ status: false, message: "otherresource is Required" });
        }
        otherresource = otherresource.trim();


        if (!nameRegex.test(organizationName)) return res.status(400).send({ status: false, message: "organizationName is not valid, only characters are allowed" });
        if (!numberRegex.test(establishment)) return res.status(400).send({ status: false, message: "establishment is not valid, only number is allowed" });


        let organizationData = await organizationModel.create(body);
        return res.status(201).send({ status: true, data: organizationData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

};

const getOrganization = async function (req, res) {
    try {

        let organizationData = await organizationModel.find();
        if (!organizationData.length === 0) return res.status(404).send({ status: true, message: 'Data not found' });

        return res.status(201).send({ status: true, data: organizationData });

    } catch {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getOrganizationDetails = async function (req, res) {
    try {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) return res.status(400).send({ status: false, message: "Invalid Id" });

        let organizationDetails = await organizationModel.findById(id);
        if (!organizationDetails) return res.status(404).send({ status: true, message: 'Data not found' });

        return res.status(201).send({ status: true, data: organizationDetails });

    } catch {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createOrganization, getOrganization, getOrganizationDetails};