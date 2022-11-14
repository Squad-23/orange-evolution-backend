

const selfUserValidator = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(req.id !== id) {
            return res.status(401).send({ message: "User don't authorized!" });
        }

        return next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default { selfUserValidator };
