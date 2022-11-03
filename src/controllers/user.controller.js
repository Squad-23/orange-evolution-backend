const createUserController = (req, res) => {
  const {
    name, email, senha, thisADM,
  } = req.body;

  if (!name || !email || !senha || !thisADM) {
    res.status(400).send({ mensagen: 'Preencha todos os campos.' });
  }
  res.status(201).send({
    user: {
      name,
      email,
      thisADM,
    },
  });
};

module.exports = { createUserController };
