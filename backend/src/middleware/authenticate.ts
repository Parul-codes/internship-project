import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: 'student' | 'mentor' | 'admin';
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token) as {
      userId: string;
      role: 'student' | 'mentor' | 'admin';
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
