import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import courseRoutes from './routes/course.routes'
import chaptersRoutes from './routes/chapters.routes'
import progressRoutes from './routes/progress.routes'
import certificateRoutes from './routes/certificate.routes'

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://your-frontend-domain.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// VERY IMPORTANT
app.options("*", cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', chaptersRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);


export default app;
