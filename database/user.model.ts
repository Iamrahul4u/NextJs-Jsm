import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  password?: string;
  reputation?: number;
  picture?: string;
  location?: string;
  saved?: Schema.Types.ObjectId[];
  joinedAt?: Date;
  portfolioWebsite?: string;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  picture: {
    type: String,
  },
  location: {
    type: String,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question", // Reference to the Question model or another applicable model
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  portfolioWebsite: {
    type: String,
  },
});

const User = models.User || model<IUser>("User", userSchema);

export { User };
