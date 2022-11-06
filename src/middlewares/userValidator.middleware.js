const userService = require('../services/user.service');

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

module.exports = { validUser };
