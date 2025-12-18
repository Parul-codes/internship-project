import { Request, Response } from 'express';
import User from '../models/User';

// GET /api/users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// PUT /api/users/:id/approve-mentor
export const approveMentor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'mentor') {
      return res.status(400).json({ message: 'User is not a mentor' });
    }

    user.approved = true;
    await user.save();

    res.json({ message: 'Mentor approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve mentor' });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
