const User = require('../models/User');

const findByEmailUserService = (email) => User.findOne({ email });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const updateUserService = (
  id,
  name,
  email,
  password,
  thisADM,
) => User.findOneAndUpdate(
  {
    _id: id,
  },
  {
    name,
    email,
    password,
    thisADM,
  },
  {
    rawResult: true,
  },
);

module.exports = {
  findByEmailUserService,
  createUserService,
  findAllUserService,
  findByIdUserService,
  updateUserService,
};
