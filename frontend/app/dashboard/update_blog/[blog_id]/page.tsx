"use client";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/utils/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolBar from "../_toolbar/toolbar";
import { BlogFormSchema } from "@/schemas/blog";
import { useState, useEffect } from "react";
import { Rss, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/utils/cloudinary/image_handler";
import { axiosInstance } from "@/axios/axios_instance";
import { AxiosError } from "axios";

const UpdateBlog = ({ params }: { params: Promise<{ blog_id: string }> }) => {
  const { blog_id } = use(params);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [textContent, setTextContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState<{
    title: string;
    content: string;
    cover_image: string;
  } | null>(null);

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      author_id: user.user_id || "",
      cover_image: "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Document,
      Paragraph,
      Text,
      Subscript,
      Superscript,
      BulletList,
      ListItem,
      OrderedList,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your `Blgr` content here" }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: blogData?.content || "",
    immediatelyRender: false,
    autofocus: true,
    injectCSS: true,
    editable: true,
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-4 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      const content = editor.getText();
      setTextContent(content);
      form.setValue("content", editor.getHTML(), { shouldValidate: true });
    },
  });

  useEffect(() => {
    if (editor && blogData?.content) {
      editor.commands.setContent(blogData.content);
      setTextContent(blogData.content.replace(/<[^>]+>/g, ""));
      form.setValue("content", blogData.content, { shouldValidate: true });
    }
  }, [editor, blogData, form]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/${blog_id}`);
        const blog = response.data.target_blog;

        setBlogData({
          title: blog.title,
          content: blog.content,
          cover_image: blog.cover_image,
        });

        form.reset({
          title: blog.title,
          content: blog.content,
          author_id: user.user_id || "",
          cover_image: blog.cover_image,
        });

        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error(error);
        toast.error(
          axiosError.response?.data.message || "Failed to fetch blog details"
        );
        setLoading(false);
      }
    };

    if (blog_id) {
      fetchBlog();
    }
  }, [blog_id, form, user.user_id]);

  const onSubmit = async (data: z.infer<typeof BlogFormSchema>) => {
    if (!editor) {
      toast.error("Editor not loaded yet");
      return;
    }

    if (!blog_id) {
      toast.error("Blog id not found");
      return;
    }

    const currentTextContent = editor.getText() || "";
    if (currentTextContent.trim().length < 50) {
      toast.error("Content must be at least 50 characters");
      return;
    }

    if (!data.author_id) {
      toast.error("User authentication required");
      return;
    }

    setIsUploading(true);
    try {
      let coverImageUrl = data.cover_image;

      if (coverImage) {
        coverImageUrl = await uploadToCloudinary(coverImage);
      }

      const payload = {
        title: data.title,
        content: editor.getHTML(),
        author_id: data.author_id,
        cover_image: coverImageUrl,
      };

      const response = await axiosInstance.put(
        `/blogs/update/${blog_id}`,
        payload
      );

      if (response.data.success) {
        toast.success("Blog updated successfully!");
        router.push(`/dashboard/my_blogs/${user.user_id}`);
        router.refresh();
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(axiosError);
      toast.error(
        axiosError.response?.data?.message || "Update failed. Try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(file);
  };

  if (loading || !blog_id) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <article className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      <div className="w-full flex flex-col justify-start items-start mt-5">
        <h1 className="text-3xl font-bold">Update Blog</h1>
        <Separator className="my-3" />
      </div>

      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Blog Details</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={() => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <div className="border rounded-md overflow-hidden">
                        {editor && <ToolBar editor={editor} />}
                        <EditorContent
                          editor={editor}
                          className="min-h-[300px] prose prose-sm sm:prose-base max-w-none focus:outline-none"
                        />
                      </div>
                    </FormControl>

                    {textContent.length < 50 && (
                      <p className="text-sm text-destructive mt-2">
                        Content should be at least 50 characters (currently{" "}
                        {textContent.length})
                      </p>
                    )}

                    {textContent.length >= 50 && (
                      <p className="text-sm text-green-600 mt-2">
                        {textContent.length} characters - Good to go!
                      </p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={isUploading}
                        />
                        {coverImage && (
                          <p className="text-sm text-green-600">
                            Selected: {coverImage.name}
                          </p>
                        )}
                        {!coverImage && field.value && (
                          <div className="flex flex-col items-left gap-2">
                            <p className="text-sm text-muted-foreground">
                              Current image:
                            </p>
                            {field.value && (
                              <img
                                src={field.value}
                                alt="current-uploaded-image"
                                className="w-30 h-30 object-cover rounded"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={
                    textContent.length < 50 ||
                    isUploading ||
                    !form.formState.isValid
                  }
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Rss className="mr-2" />
                      Update Blog
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </article>
  );
};

export default UpdateBlog;
