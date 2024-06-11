import { Document, Schema, Types, model } from 'mongoose';

export interface MemoDoc extends Document {
  user: Types.ObjectId;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}

const memoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    icon: {
      type: String,
      default: '📝',
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
    favorite: {
      type: Boolean,
      default: false,
    },
    favoritePosition: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const MemoModel = model<MemoDoc>('Memo', memoSchema);
