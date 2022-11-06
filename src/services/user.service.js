/* eslint-disable import/extensions */
import User from '../models/User.js';

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const findByEmailUserService = (email) => User.findOne({ email });

const updateUserService = (user) => User.updateOne(user);

const deleteUserService = (id) => User.findByIdAndDelete({ _id: id });

export default {
    findByEmailUserService,
    createUserService,
    findAllUserService,
    findByIdUserService,
    updateUserService,
    deleteUserService,
};
