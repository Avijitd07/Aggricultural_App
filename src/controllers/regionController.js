const regionModel = require('../models/regionModel');
const ObjectId = require('mongoose').Types.ObjectId;


const isValid = function (val) {
    if (typeof val === "undefined" || val === null) return false;
    if (typeof val === "string" && val.trim().length === 0) return false;

    return true;
};
const isValidBody = function (val) {
    return Object.keys(val).length > 0;
};



const createRegion = async function (req, res) {
    try {
        let body = req.body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }

        let { propertyId, state, agriculturalRegion, cropType } = body;

        if (!isValid(propertyId)) {
            return res.status(400).send({ status: false, message: "propertyId is Required" });
        }
        if (!isValid(state)) {
            return res.status(400).send({ status: false, message: "state is Required" });
        }
        if (!isValid(agriculturalRegion)) {
            return res.status(400).send({ status: false, message: "agriculturalRegion is Required" });
        }
        if (!isValid(cropType)) {
            return res.status(400).send({ status: false, message: "cropType is Required" });
        }

        if (!ObjectId.isValid(propertyId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });

        let regionData = await regionModel.create(body);
        return res.status(201).send({ status: true, message: regionData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getRegion = async function(req,res){
    try{
        let propertyId = req.params.propertyId;

        if (!ObjectId.isValid(propertyId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });
    
        let regionData = await regionModel.find({propertyId:propertyId}).populate({ path: 'propertyId', populate: [{ path: 'organizationId', model: 'Organization' }] });
        if(!regionData)return res.status(400).send({ status: false, message: 'regionData is not Found' });
    
        return res.status(200).send({status: true, data: regionData});

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });
    }

}

module.exports = {createRegion, getRegion};