/* eslint-disable import/extensions */
import userService from '../services/user.service.js';

const createUserController = async (req, res) => {
    try {
        const {
            name, email, password,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: 'Fill in all fields' });
        }

        const userRes = {
            name,
            email,
            password,
            thisADM: false,
        };

        const user = await userService.createUserService(userRes);

        if (!user) {
            return res.status(400).send({ message: 'Error creating user' });
        }

        return res.status(201).send({
            message: 'User created successfully',
            user: {
                id: user.id,
                name,
                email,
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findAllUserController = async (req, res) => {
    try {
        const users = await userService.findAllUserService();

        if (users.length === 0) {
            return res.status(400).send({
                message: 'There are no registered users',
            });
        }
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findUserByIdController = async (req, res) => {
    try {
        return res.send(req.user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findUserByEmailController = async (req, res) => {
    try {
        const email = req.param;

        const user = await userService.findByEmailUserService(email);

        if (!user) {
            return res.status(401).send({ message: 'Incorrect data' });
        }

        return res.send(req.user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const updateUserController = async (req, res) => {
    try {
        const { user } = req;

        const userUpdate = {
            id: user.id,
            name: !req.body.name ? user.name : req.body.name,
            email: user.email,
            password: !req.body.password ? user.password : req.body.password,
            thisADM: !req.body.thisADM ? user.thisADM : req.body.thisADM,
        };

        await userService.updateUserService(userUpdate);

        return res.send({
            message: 'User update successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const deleteUserController = async (req, res) => {
    try {
        await userService.deleteUserService(req.id);
        return res.status(204).send({ message: 'User deleted' });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.findByEmailUserService(email);

        if (!user) {
            return res.status(401).send({ message: 'Incorrect data' });
        }
        if (user.password === password) {
            return res.status(202).send({ message: 'User login successfully' });
        }

        return res.status(401).send({ message: 'Incorrect data' });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export default {
    createUserController,
    findAllUserController,
    findUserByIdController,
    findUserByEmailController,
    updateUserController,
    deleteUserController,
    login,
};
