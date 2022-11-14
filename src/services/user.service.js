import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const findByEmailUserService = (email) => User.findOne({ email });

const getUserSubscribedTrails = (id) => User.findById(id).populate("trails");

const updateUserService = (id, data) => User.findByIdAndUpdate(id, data);

const deleteUserService = (id) => User.findByIdAndDelete({ _id: id });

const loginUserService = (email) => User.findOne({ email }).select('+password');

const updateAdmService = (_id, adm) => User.findByIdAndUpdate(_id, adm);

const generateToken = (id, thisADM) => jwt.sign({id:id, thisADM:thisADM}, process.env.SECRET_JWT, { expiresIn: 10800 });


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
    generateToken,
};
