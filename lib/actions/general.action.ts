"use server";

import { Question } from "@/database/question.model";
import connectDb from "../mongoose";
import { SearchParams } from "../sharedtypes/sharedtypes";
import { User } from "@/database/user.model";
import { Tag } from "@/database/tag.model";
import { Answer } from "@/database/answer.model";

const searchableTypes = ["question", "user", "answer", "tag"];
export const globalSearch = async (params: SearchParams) => {
  try {
    connectDb();
    const { query, type } = params;
    const resultQuery = { $regex: query, $options: "i" };
    let result = [];
    const modelTypes = [
      { type: "question", matchField: "title", model: Question },
      { type: "user", matchField: "name", model: User },
      { type: "tag", matchField: "name", model: Tag },
      { type: "answer", matchField: "content", model: Answer },
    ];
    const typeLower = type?.toLowerCase() || "";
    if (!typeLower && !searchableTypes.includes(typeLower)) {
      for (const { type, matchField, model } of modelTypes) {
        const queryResults = await model
          .find({ [matchField]: resultQuery })
          .limit(8);
        result.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers Containing ${query}`
                : item[matchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.questionId
                  : item._id,
          })),
        );
      }
    } else {
      const modelInfo = modelTypes.find((item) => item.type === typeLower);
      if (!modelInfo) {
        throw new Error("Invalid Search types");
      }
      const queryResults = await modelInfo.model
        .find({ [modelInfo.matchField]: resultQuery })
        .limit(8);

      result = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers Containing ${query}`
            : item[modelInfo.matchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.questionId
              : item._id,
      }));
    }
    return JSON.stringify(result);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
