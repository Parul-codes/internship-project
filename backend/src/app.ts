import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import courseRoutes from './routes/course.routes'
import chaptersRoutes from './routes/chapters.routes'
import progressRoutes from './routes/progress.routes'
import certificateRoutes from './routes/certificate.routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', chaptersRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);


export default app;
