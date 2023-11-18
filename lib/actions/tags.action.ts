"use server";

import { Tag } from "@/database/tag.model";
import connectDb from "../mongoose";
import { GetQuestionsByTagIdParams } from "../sharedtypes/sharedtypes";
import { Question } from "@/database/question.model";
import { User } from "@/database/user.model";
import { FilterQuery } from "mongoose";

interface Props {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
export const getTags = async (params: Props) => {
  try {
    connectDb();
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};
    switch (filter) {
      case "Popular":
        sortOptions = { questions: -1 };
        break;
      case "Recent":
        sortOptions = { createdOn: -1 };
        break;
      case "Name":
        sortOptions = { name: 1 };
        break;
      case "Old":
        sortOptions = { createdOn: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.find(query).sort(sortOptions);
    return tags;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const getPopularTags = async () => {
  try {
    connectDb();
    const tags = await Tag.aggregate([
      { $project: { name: 1, numberofQuestions: { $size: "$questions" } } },
      { $sort: { numberofQuestions: -1 } },
      { $limit: 5 },
    ]);
    return tags;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const getQuestionByTags = async (params: GetQuestionsByTagIdParams) => {
  try {
    connectDb();

    const { tagId, searchQuery, filter } = params;

    const TagFilter: FilterQuery<typeof Tag> = searchQuery
      ? {
          title: { $regex: searchQuery, $options: "i" },
        }
      : {};

    let sortOptions = {};
    switch (filter) {
      case "Highest Upvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "Most Viewed":
        sortOptions = { views: -1 };
        break;
      case "Lowest Upvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "Most Recents":
        sortOptions = { createdAt: -1 };
        break;
      case "Oldest":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: TagFilter,

      options: { sort: sortOptions },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    return tags;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
