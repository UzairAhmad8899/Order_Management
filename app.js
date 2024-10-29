import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import driverRoutes from './routes/driverRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/drivers', driverRoutes)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on localhost port ${PORT}`);
});
