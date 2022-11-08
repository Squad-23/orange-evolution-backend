/* eslint-disable import/extensions */
import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import contentRoute from './src/routes/content.route.js';

const app = express();
const port = 3000;

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/content', contentRoute);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
