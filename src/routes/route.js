const express = require('express');
const { createAdmin, adminLogin } = require('../controllers/adminController');
const { createCrop } = require('../controllers/cropController');
const { createCropField } = require('../controllers/cropFieldController');
const { createCropProperty } = require('../controllers/cropPropertyController');
const { createField, getField } = require('../controllers/fieldController');
const { createOrganization, getOrganization, getOrganizationDetails } = require('../controllers/organizationController');
const { createProperty, getProperty } = require('../controllers/propertyController');
const { createRegion, getRegion } = require('../controllers/regionController');
const { authentication } = require('../validations/Auth');
const router = express.Router();

// Admin Routes
router.post('/agri/v1/createAdmin', createAdmin);
router.post('/agri/v1/loginAdmin', adminLogin);

//Organization Routes
router.post('/agri/v1/createOrg', authentication, createOrganization);
router.get('/agri/v1/getAllOrg', getOrganization);
router.get('/agri/v1/getOrg/:id', getOrganizationDetails);

// Fields Routes
router.post('/agri/v1/createField', authentication,createField);
router.get('/agri/v1/getField/:propertyId/:regionId', getField);

// Property Routes
router.post('/agri/v1/createProperty', authentication, createProperty);
router.get('/agri/v1/getProperty/:organizationId', getProperty);

//Region Routes
router.post('/agri/v1/createRegion', authentication, createRegion);
router.get('/agri/v1/getRegion/:propertyId', getRegion);

// Crop Routes
router.post('/agri/v1/createCrop', authentication, createCrop);
router.post('/agri/v1/createCropProperty', authentication, createCropProperty); // -------> Crop Properties Route
router.post('/agri/v1/createCropField', authentication, createCropField); // --------> Crop Field Route


module.exports = router;