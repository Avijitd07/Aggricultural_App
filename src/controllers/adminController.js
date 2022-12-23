const adminModel = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

let nameRegex = /^([a-zA-Z])+$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;


const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;

    return true;
};
const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};




const createAdmin = async function (req, res) {
    try {
        let body = req.body;

        if (!isValidBody(body)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details" });
        }

        let { fname, lname, companyEmail, companyPassword } = body;

        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "First name is Required" })
        }
        fname = fname.trim();

        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "Last name is Required" })
        }
        lname = lname.trim();

        if (!isValid(companyEmail)) {
            return res.status(400).send({ status: false, message: "Company email is Required" })
        }
        companyEmail = companyEmail.trim();

        if (!isValid(companyPassword)) {
            return res.status(400).send({ status: false, message: "Company password is Required" })
        }
        companyPassword = companyPassword.trim();


        if (!nameRegex.test(fname)) return res.status(400).send({ status: false, message: "FName is not valid, only characters are allowed" });
        if (!nameRegex.test(lname)) return res.status(400).send({ status: false, message: "LName is not valid, only characters are allowed" });
        if (!emailRegex.test(companyEmail)) return res.status(400).send({ status: false, message: "Email is not valid" });
        if (!passwordRegex.test(companyPassword)) return res.status(400).send({ status: false, message: "Your password must contain atleast one number,uppercase,lowercase and special character[ @ $ ! % * ? & # ] and length should be min of 8-15 charachaters" });



        let email = await adminModel.findOne({ companyEmail: companyEmail });
        if (email) return res.status(400).send({ status: false, message: 'email already exist' });

        let encryptedPassword = await bcrypt.hash(companyPassword, saltRounds);

        let validData = { fname, lname, companyEmail, companyPassword: encryptedPassword };

        let adminData = await adminModel.create(validData);
        return res.status(201).send({ status: true, data: adminData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

};

const adminLogin = async function (req, res) {
    try {
        let companyEmail = req.body.companyEmail;
        let companyPassword = req.body.companyPassword;

        // Email validation
        if (!isValid(companyEmail)) {
            return res.status(400).send({ status: false, message: "Email is Required" });
        }
        if (!emailRegex.test(companyEmail)) return res.status(400).send({ status: false, message: "Email is not valid" });

        // Password validation
        if (!isValid(companyPassword)) {
            return res.status(400).send({ status: false, message: "Password is Required" });
        }
        if (!passwordRegex.test(companyPassword)) return res.status(400).send({ status: false, message: "Your password must contain atleast one number,uppercase,lowercase and special character[ @ $ ! % * ? & # ] and length should be min of 8-15 charachaters" });


        let findAdmin = await adminModel.findOne({ companyEmail: companyEmail });
        if (!findAdmin) return res.status(404).send({ status: false, msg: 'invalid emailId' });


        let verifiedPassword = await bcrypt.compare(companyPassword, findAdmin.companyPassword);

        if (!verifiedPassword) return res.status(400).send({ status: false, message: "Invalid credentials" });

        let token = jwt.sign({
            userId: findAdmin._id.toString(),
        }, "GYXCVOUEWGD72EYHD2HFIOUE2GFOCBWQOUYF23456", { expiresIn: '1h' });
        //console.log(token)

        return res.status(200).send({ status: true, message: "Success", token: token });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createAdmin, adminLogin };