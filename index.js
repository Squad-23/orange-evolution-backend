import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/db.js';
import cors from 'cors';
import userRoute from './src/routes/user.route.js';
import trailRoute from './src/routes/trail.route.js';
import moduleRoute from './src/routes/module.route.js';
import contentRoute from './src/routes/content.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();
app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/trail', trailRoute);
app.use('/trail/:idTrail/module', moduleRoute);
app.use('/content', contentRoute);
app.use(express.static('documentation'));

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
