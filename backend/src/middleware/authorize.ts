import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticate';

export const authorize =
  (allowedRoles: Array<'student' | 'mentor' | 'admin'>) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
