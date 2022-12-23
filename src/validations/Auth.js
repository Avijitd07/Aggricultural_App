const jwt = require("jsonwebtoken");


const authentication = function (req, res, next) {
    try {
        const token = req.headers[`x-api-key`]
        if (!token) return res.status(401).send({ status: false, msg: "Token must be present in Headers" });


        let decodedToken=jwt.verify(token, "GYXCVOUEWGD72EYHD2HFIOUE2GFOCBWQOUYF23456", (error, decodedToken) => {
            if(error){
                const message=
                    error.message == "jwt expired"
                        ? "Token is expired"
                        : "Token is invalid"
                return res.status(401).send({status: false, message});
            }

            req.userId = decodedToken.userId;
            next();
            
        })

    } catch (error) {

        return res.status(500).send({ status: false, msg: error.message });

    }
}
module.exports = { authentication };