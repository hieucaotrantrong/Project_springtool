import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/wallet';

const app = express();

/*----------------------------------
-----------------------------------*/
app.use(cors());
app.use(bodyParser.json());

/*----------------------------------
-----------------------------------*/
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

export default app;
