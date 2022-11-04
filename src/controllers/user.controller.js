const userService = require('../services/user.service');

const createUserController = async (req, res) => {
  const {
    name, email, password,
  } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ message: 'Preencha todos os campos.' });
  }

  const user = await userService.createUserService(req.body);

  if (!user) {
    res.status(400).send({ message: 'Erro ao criar user' });
  }

  res.status(201).send({
    message: 'User create.',
    user: {
      id: user.id,
      name,
      email,
    },
  });
};

module.exports = { createUserController };
