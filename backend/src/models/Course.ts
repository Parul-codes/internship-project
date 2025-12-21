import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  mentorId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studentId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]

  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
