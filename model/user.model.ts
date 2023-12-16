import { Document, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joined: Date;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: String,

  bio: String,

  avatar: String,

  location: String,

  portfolio: String,

  reputation: {
    type: Number,
    default: 0,
  },

  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],

  joined: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
