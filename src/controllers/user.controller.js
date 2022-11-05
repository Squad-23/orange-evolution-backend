const mongoose = require('mongoose');
const userService = require('../services/user.service');

const createUserController = async (req, res) => {
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
};

const findAllUserController = async (req, res) => {
    const users = await userService.findAllUserService();

    if (users.length === 0) {
        return res.status(400).send({
            message: 'There are no registered users',
        });
    }
    return res.send(users);
};

const findUserByIdController = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' });
    }

    const user = await userService.findByIdUserService(id);

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    return res.send(user);
};

const findUserByEmailController = async (req, res) => {
    const { email } = req.params;

    const user = await userService.findByEmailUserService(email);

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    return res.send(user);
};

const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID' });
        }

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const userUpdate = {
            id,
            name: !req.body.name ? user.name : req.body.name,
            email: !req.body.email ? user.email : req.body.email,
            password: !req.body.password ? user.password : req.body.password,
            thisADM: !req.body.thisADM ? user.thisADM : req.body.thisADM,
        };

        await userService.updateUserService(userUpdate);

        return res.send({
            message: 'User update successfully',
            user: {
                id: userUpdate.id,
                name: userUpdate.name,
                email: userUpdate.email,
            },
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID' });
        }

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        await userService.deleteUserService(id);
        return res.status(204).send({ message: 'User deleted' });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = {
    createUserController,
    findAllUserController,
    findUserByIdController,
    findUserByEmailController,
    updateUserController,
    deleteUserController,
};
