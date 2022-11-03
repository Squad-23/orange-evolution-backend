/* eslint-disable import/newline-after-import */
/* eslint-disable no-template-curly-in-string */
const express = require('express');
const app = express();
const userRoute = require('./src/routes/user.route');

const port = 3000;

app.use('/user', userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
