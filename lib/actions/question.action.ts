"use server";

import { Question } from "@/database/question.model";
import connectDb from "../mongoose";
import { Tag } from "@/database/tag.model";
import { User } from "@/database/user.model";
import { CreateAnswerParams, CreateAnswerParams, GetAnswersParams } from "../sharedtypes/sharedtypes";

export const getQuestions = async (params: GetAnswersParams) => {
    connectDb();
    try{
        const questions=await Question.find({}).populate({path:'tags',model:Tag}).populate({path:'author',model:User})
        return questions
    }
    catch(error:any){
        throw new Error(error);
    }
}
export const postQuestion = async (params: CreateAnswerParams) => {
    connectDb();
    try {
        const { title, content, tags, author, path } = params;
        const question = await Question.create({
            title,
            content,
            author,
            createdAt: new Date(),
        })
        const tagDocuments = [];
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
                { $setOnInsert: { name: tag }, $push: { questions: question._id } },
                { upsert: true ,new:true}
            );
            tagDocuments.push(existingTag._id);
        }
        await Question.findByIdAndUpdate(question._id, { $push: { tags: tagDocuments } });
    } catch (error:any) {
        console.log("error:"+error.message)
    }
}
