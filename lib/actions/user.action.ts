/* eslint-disable no-undef */
"use server";

import { User } from "@/database/user.model";
import connectDb from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "../sharedtypes/sharedtypes";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";

export const getUser = async (params: any) => {
  connectDb();
  try {
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const createUser = async (params: CreateUserParams) => {
  try {
    connectDb();
    const user = await User.create(params);
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectDb();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User Not Found");
    }
    await Question.deleteMany({ author: user._id });
    const deletedUser = await User.findByIdAndDelete({ _id: user._id });
    return deletedUser;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectDb();

    const { path, clerkId, updateData } = params;
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
