import { model, models, Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  createdAt: Date;
  tags: Schema.Types.ObjectId[];
  views?: number;
  author: Schema.Types.ObjectId;
  upvotes?: Schema.Types.ObjectId[];
  downvotes?: Schema.Types.ObjectId[];
  answers?: Schema.Types.ObjectId[];
}

const questionSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag", // Reference to another Mongoose model if applicable
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model or another applicable model
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model or another applicable model
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model or another applicable model
    },
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer", // Reference to the Answer model or another applicable model
    },
  ],
});

export const Question =
  models.Question || model<IQuestion>("Question", questionSchema);
