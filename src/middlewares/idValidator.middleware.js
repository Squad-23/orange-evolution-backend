import { Types } from 'mongoose';

const validId = (req, res, next) => {
    for (const param in req.params) {
        if (param.includes("id")) {
            if (!Types.ObjectId.isValid(req.params[param])) {
                return res.status(400).send({ message: 'Invalid id!' });
            }
        }
    }

    return next();
};

export default { validId };
