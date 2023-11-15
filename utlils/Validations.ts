import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(20),
  tags: z.array(z.string().min(3).max(10)).min(1).max(5),
});

export const AnswerSchema = z.object({
  content: z.string().min(50).max(2000),
});

export const ProfileSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(25),
  bio: z.string().min(10).max(200),
  location: z.string().min(3).max(50),
  portfolioWebsite: z.string().url().min(6).max(50),
});
