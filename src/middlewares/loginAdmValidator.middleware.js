import userService from '../services/user.service.js';

const validAdm = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.findByIdUserService(id);

        if (!user.thisADM) {
            return res.status(400).send({ message: 'User not admin' });
        }

        return next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default { validAdm };
