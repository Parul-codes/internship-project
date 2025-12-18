import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not defined');
}

export const signToken = (payload: {
  userId: string;
  role: 'student' | 'mentor' | 'admin';
}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
