/* eslint-disable import/extensions */
import userService from '../services/user.service.js';

const validUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        req.id = id;
        req.user = user;

        return next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const validEmailUser = async (req, res, next) => {
    try {
        const { email, password } = req.params;

        const user = await userService.findByEmailUserService(email);

        if (!user) {
            return res.status(401).send({ message: 'Incorrect data' });
        }

        req.password = password;
        req.user = user;
        return next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default { validUser, validEmailUser };
