import { Types } from 'mongoose';

const validId = (req, res, next) => {
    const idParam = req.params.id;

    if (!Types.ObjectId.isValid(idParam)) {
        return res.status(400).send({ message: 'Invalid id!' });
    }
    return next();
};

export default { validId };
