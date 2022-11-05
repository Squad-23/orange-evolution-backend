const mongoose = require('mongoose');
const userService = require('../services/user.service');

const createUserController = async (req, res) => {
    const {
        name, email, password,
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Fill in all fields' });
    }
    const user = await userService.createUserService(req.body);

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

    const user = await userService.findByIdUserService(email);

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    return res.send(user);
};

const updateUserController = async (req, res) => {
    try {
        const {
            name, email, password, thisADM,
        } = req.body;

        if (!name && !email && !password && !thisADM) {
            return res.status(400).send({ message: 'Enter at least one field to update' });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID' });
        }

        const user = await userService.findByIdUserService(id);

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        await userService.updateUserService(name, email, password, thisADM);

        return res.send({ message: 'User update successfully' });
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

        userService.deleteUserService(id);
        return res.send({ message: 'User deleted' });
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
