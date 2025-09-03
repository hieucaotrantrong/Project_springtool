import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/database';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import chatbot from './routes/chatbot';
import orderRoutes from "./routes/order.routes";
import supportRouter from "./routes/support";
import notificationsRoutes from './routes/notifications';
import walletRoutes from './routes/wallet';
import adminRoutes from './routes/admin';
/*------------------------------------
Dotnev
--------------------------------------*/
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/*------------------------------------
Middleware
--------------------------------------*/
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/*------------------------------------
Routes
--------------------------------------*/
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chatbot', chatbot);
app.use('/api/orders', orderRoutes);
app.use("/api/support", supportRouter);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);
/*------------------------------------
Start Servers
--------------------------------------*/
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

/*------------------------------------
Check connect Database
--------------------------------------*/
database.getConnection()
    .then((connection) => {
        console.log('Database connected successfully!');
        connection.release();
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });





