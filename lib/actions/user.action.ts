"use server";

import { User } from "@/database/user.model";
import connectDb from "../mongoose";

export const getUser = async (params: any) => {
    connectDb();
    try {
        const {userId}=params;
        const user=await User.findOne({clerkId:userId})
        return user;
    } catch (error:any) {
        console.log("error:"+error.message)
    }
}
