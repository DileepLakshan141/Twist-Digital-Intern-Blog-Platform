import { z } from "zod";

export const BlogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  author_id: z.string().min(1, "Author ID is required"),
  cover_image: z.string().optional(),
});
