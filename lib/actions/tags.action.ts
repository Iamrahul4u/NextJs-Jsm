"use server";

import { Tag } from "@/database/tag.model";
import connectDb from "../mongoose";
import { GetQuestionsByTagIdParams } from "../sharedtypes/sharedtypes";
import { Question } from "@/database/question.model";
import { User } from "@/database/user.model";
import { FilterQuery } from "mongoose";

export const getTags = async () => {
  try {
    connectDb();
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestionByTags = async (params: GetQuestionsByTagIdParams) => {
  try {
    connectDb();

    const { tagId, page = 1, pageSize = 20, searchQuery } = params;

    const TagFilter: FilterQuery<typeof Tag> = searchQuery
      ? {
          title: { $regex: searchQuery, $options: "i" },
        }
      : {};

    const tags = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: TagFilter,

      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
