

const admValidator = async (req, res, next) => {
    try {
        if(req.thisADM === false) {
            return res.status(401).send({ message: "User don't is ADM!" });
        }

        return next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default { admValidator };
