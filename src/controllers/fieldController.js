const fieldModel = require('../models/fieldModel');
const ObjectId = require('mongoose').Types.ObjectId;


let nameRegex = /^[a-zA-Z0-9\s][^|=]*$/;
let latRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
let longRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
// let numRegex = /^[0-9]+$/;

const isValid = function (val) {
    if (typeof val === "undefined" || val === null) return false;
    if (typeof val === "string" && val.trim().length === 0) return false;

    return true;
};

const isValidBody = function (val) {
    return Object.keys(val).length > 0;
};


const createField = async function(req, res){
    try{
        let body = req.body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }

        let {regionId, propertyId, farmsize, longitude, latitude, croprecords} = body;


        if (!isValid(regionId)) {
            return res.status(400).send({ status: false, message: "regionId is Required" })
        }
        if (!isValid(propertyId)) {
            return res.status(400).send({ status: false, message: "title is Required" })
        }
        if (!isValid(farmsize)) {
            return res.status(400).send({ status: false, message: "farmsize is Required" })
        }
        if (!isValid(longitude)) {
            return res.status(400).send({ status: false, message: "longitude is Required" })
        }
        if (!isValid(latitude)) {
            return res.status(400).send({ status: false, message: "latitude is Required" })
        }
        if (!isValid(croprecords)) {
            return res.status(400).send({ status: false, message: "croprecords is Required" })
        }


        if (!ObjectId.isValid(regionId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });
        if (!ObjectId.isValid(propertyId)) return res.status(400).send({ status: false, message: 'Please put a valid Id' });


        if (!nameRegex.test(farmsize)) return res.status(400).send({ status: false, message: "Please enter the valid input" });
        if (!latRegex.test(longitude)) return res.status(400).send({ status: false, message: "Please enter the valid input" });
        if (!longRegex.test(longitude)) return res.status(400).send({ status: false, message: "Please enter the valid input" });


        let fieldData = await fieldModel.create(body);
        return res.status(201).send({status: true, data: fieldData});


    }catch(error){
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getField = async (req, res) => {

    try {
        let propertyId = req.params.propertyId;
        let regionId = req.params.regionId;

        if (!ObjectId.isValid(regionId)) return res.status(400).send({ status: false, message: `${regionId} it's not valid RegionId Please check Ones` });

        if (!ObjectId.isValid(propertyId)) return res.status(400).send({ status: false, message: `${propertyId} it's not valid PropertyId Please check Ones` });

        let findData = await fieldModel.find({ propertyId: propertyId, regionId: regionId }).populate({ path: 'propertyId', populate: [{ path: 'organizationId', model: 'Organization' }] }).populate('regionId');

        if (findData.length == 0) return res.status(400).send({ status: false, message: `Field is not Found` });

        res.status(200).send({ status: true, "message": findData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = {createField, getField};