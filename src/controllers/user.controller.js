import userService from "../services/user.service.js";
import bcrypt from "bcrypt";

const createUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Fill in all fields" });
        }

        const userRes = {
            name,
            email,
            password,
            thisADM: false,
        };

        const user = await userService.createUserService(userRes);

        if (!user) {
            return res.status(400).send({ message: "Error creating user" });
        }

        return res.status(201).send({
            message: "User created successfully",
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
                message: "There are no registered users",
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
        const { email } = req.params;

        const user = await userService.findByEmailUserService(email);

        if (!user) {
            return res.status(401).send({ message: "Incorrect data" });
        }

        return res.send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;

        const userUpdate = {
            id: user.id,
            name: !req.body.name ? user.name : req.body.name,
            email: !req.body.email ? user.email : req.body.email,
            password: !req.body.password
                ? user.password
                : await bcrypt.hash(req.body.password, 10),
            thisADM: user.thisADM,
        };

        await userService.updateUserService(id, userUpdate);

        return res.send({
            message: "User update successfully",
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
        await userService.deleteUserService(req.id);
        return res.status(204).send({ message: "User deleted" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.loginUserService(email);

        if (!user) {
            return res.status(401).send({ message: "Incorrect data" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect data" });
        }

        const token = userService.generateToken(user.id, user.thisADM);

        return res.status(202).send({
            message: "User login successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                thisADM: user.thisADM,
                trails: user.trails,
                completeds: user.completeds,
            },
            token,
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const activeAdmController = async (req, res) => {
    try {
        const { _id, name, email, thisADM } = req.body;

        const user = await userService.updateAdmService(_id, req.body);

        if (!user) {
            return res.status(400).json({ message: "Error updating user adm" });
        }

        return res.send({
            message: "Adm active successfully",
            user: {
                _id,
                name,
                email,
                thisADM,
            },
        });
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
    activeAdmController,
};
