import { Document, Schema, model } from 'mongoose';

export interface UserDoc extends Document {
  email: string;
  userName: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const UserModel = model<UserDoc>('User', userSchema);
