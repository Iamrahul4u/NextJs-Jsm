import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(100),
  tags: z.array(z.string().min(3).max(10)).min(1).max(5),
});
