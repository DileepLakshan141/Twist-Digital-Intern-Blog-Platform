import { z } from "zod";

export const BlogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(50, "minimum 50 letters required for a blog"),
  author_id: z.string().min(1, "Author ID is required"),
  cover_image: z.string().optional(),
});

export const CommentSchema = z.object({
  comment: z.string().min(1, "Comment must have at least 1 character/letter"),
});
