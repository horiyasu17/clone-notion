import { Document, Schema, Types, model } from 'mongoose';

export interface MemoDoc extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  position: number;
  favoritePosition: number;
}

const memoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: '無題',
    },
    description: {
      type: String,
      default: 'ここに自由に記入してください',
    },
    position: {
      type: Number,
    },
    favoritePosition: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const MemoModel = model<MemoDoc>('Memo', memoSchema);
