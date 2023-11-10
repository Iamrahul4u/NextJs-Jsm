"use server";

import { Question } from "@/database/question.model";
import connectDb from "../mongoose";
import { ViewQuestionParams } from "../sharedtypes/sharedtypes";
import { Interaction } from "@/database/interaction.model";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    connectDb();
    const { questionId, userId } = params;

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        question: questionId,
        user: userId,
        action: "view",
      });
      if (existingInteraction) return console.log("Question Already Watched");
      else {
        await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
        await Interaction.create({
          question: questionId,
          user: userId,
          action: "view",
        });
      }
    }
  } catch (error) {}
};
