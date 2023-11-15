import { model, Schema, Document, models } from "mongoose";
import { User } from "./user.model";
import { Question } from "./question.model";

export interface IAnswer extends Document {
  question: string;
  content: string;
  author: Schema.Types.ObjectId;
  upvotes?: Schema.Types.ObjectId[];
  downvotes?: Schema.Types.ObjectId[];
  createdAt: Date;
}

const answer = new Schema<IAnswer>({
  createdAt: { type: Date, default: Date.now() },
  question: { type: String, required: true, ref: Question },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: User },
  upvotes: [{ type: Schema.Types.ObjectId, ref: User }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: User }],
});

const Answer = models.Answer || model<IAnswer>("Answer", answer);

export { Answer };
