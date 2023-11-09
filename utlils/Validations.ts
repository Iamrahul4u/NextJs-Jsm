import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(20),
  tags: z.array(z.string().min(3).max(10)).min(1).max(5),
});

export const AnswerSchema = z.object({
  content: z.string().min(50).max(2000),
});
