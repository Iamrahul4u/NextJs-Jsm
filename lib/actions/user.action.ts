"use server";

import { User } from "@/database/user.model";
import connectDb from "../mongoose";
import { CreateUserParams } from "../sharedtypes/sharedtypes";

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
    const user = await User.create({ params }, { new: true });
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
