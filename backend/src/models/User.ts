import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'mentor' | 'admin';
  approved: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      required: true
    },
    approved: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// 🔑 HASH PASSWORD BEFORE SAVE (Mongoose v7+ safe)
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model<IUser>('User', UserSchema);
