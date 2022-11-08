/* eslint-disable import/extensions */
import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import trailRoute from './src/routes/trail.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/trail', trailRoute);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
