import jwt from 'jsonwebtoken';

const tokenValidator = async (req, res, next) => {
    try {
        const {authorization} = req.headers;

        if (!authorization) {
            return res.status(401).send({ message: "The token was not informed!" });
        }

        const parts = authorization.split(" ");
        const [schema, token] = parts;

        if (parts.length !== 2) {
            return res.status(401).send({ message: "Invalid token!" });
        }

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "The token was not informed!" });
        }

        var erro = false;

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if(error) {
                erro = true;
            }else{
                req.id = decoded.id;
                req.thisADM = decoded.thisADM;
            }
        })

        if(erro){
            return res.status(401).send({ message: "Invalid token!" });
        }
        return next();
    } catch (err) {
        console.log("6");
        return res.status(500).send({ message: err.message });
    }
};

export default { tokenValidator };
