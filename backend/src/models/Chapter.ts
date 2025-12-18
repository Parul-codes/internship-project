import mongoose, { Schema, Document } from 'mongoose';

export interface IChapter extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl?: string;
  sequence: number;
}

const ChapterSchema = new Schema<IChapter>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    sequence: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IChapter>('Chapter', ChapterSchema);
