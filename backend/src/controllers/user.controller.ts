import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/User';

// ADMIN creates mentor
export const createMentor = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const mentor = await User.create({
      name,
      email,
      password,
      role: 'mentor',
      approved: false
    });

    res.status(201).json({
      message: 'Mentor created, pending admin approval',
      mentorId: mentor._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create mentor' });
  }
};

// ADMIN creates admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password,
      role: 'admin',
      approved: true
    });

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create admin' });
  }
};


// ADMIN → get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ADMIN → approve mentor
export const approveMentor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const mentor = await User.findById(id);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    mentor.approved = true;
    await mentor.save();

    res.json({ message: 'Mentor approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve mentor' });
  }
};

// ADMIN deletes user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

