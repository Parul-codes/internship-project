import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { authenticate } from './middleware/authenticate';
import { authorize } from './middleware/authorize';
import userRoutes from './routes/user.routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get(
  '/api/test/admin',
  authenticate,
  authorize(['admin']),
  (_req, res) => {
    res.json({ message: 'Admin access granted' });
  }
);


export default app;
