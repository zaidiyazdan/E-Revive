import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import requestRoutes from './routes/requestRoutes.js';


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.options('*', cors());
app.use(morgan('dev'));

app.use('/user', userRoutes);
app.use('/facility', facilityRoutes);
app.use('/request', requestRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
