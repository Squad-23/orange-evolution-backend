const User = require('../models/User');

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const findByEmailUserService = (email) => User.findOne({ email });

const updateUserService = (user) => User.updateOne(user);

const deleteUserService = (id) => User.findByIdAndDelete({ _id: id });

module.exports = {
    findByEmailUserService,
    createUserService,
    findAllUserService,
    findByIdUserService,
    updateUserService,
    deleteUserService,
};
