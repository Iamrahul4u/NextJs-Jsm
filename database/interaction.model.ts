import { model, models, Schema, Document } from "mongoose";

interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  answer: Schema.Types.ObjectId;
  createdAt: Date;
}

const InteractionSchema = new Schema<IInteraction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  action: {
    type: String,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  answer: {
    type: Schema.Types.ObjectId,
    ref: "Answer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);
export { Interaction };
