"use server";

import { Tag } from "@/database/tag.model";
import connectDb from "../mongoose";

export const getTags = async () => {
  try {
    connectDb();
    const tags = await Tag.find({});
    return tags;
  } catch (error) {}
};
