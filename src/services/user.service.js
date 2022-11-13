import User from '../models/User.js';

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const findByEmailUserService = (email) => User.findOne({ email });

const getUserSubscribedTrails = (id) => User.findById(id).populate("trails");

const updateUserService = (id, data) => User.findByIdAndUpdate(id, data);

const deleteUserService = (id) => User.findByIdAndDelete({ _id: id });

const loginUserService = (email) => User.findOne({ email }).select('+password');

const updateAdmService = (_id, adm) => User.findByIdAndUpdate(_id, adm);


export default {
    findByEmailUserService,
    createUserService,
    findAllUserService,
    findByIdUserService,
    getUserSubscribedTrails,
    updateUserService,
    deleteUserService,
    loginUserService,
    updateAdmService,
};
