"use client";
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
import ToolBar from "./_toolbar/toolbar";
import { BlogFormSchema } from "@/schemas/blog";
import { useState } from "react";
import { Rss } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "../../../utils/cloudinary/image_handler";
import { axiosInstance } from "@/axios/axios_instance";
import { AxiosError } from "axios";

const CreateNewBlog = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [textContent, setTextContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Document,
      Paragraph,
      Text,
      Subscript,
      Superscript,
      BulletList,
      ListItem,
      OrderedList,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your `Blgr` content here",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "",
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

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      author_id: user.user_id || "default_user_id",
      cover_image: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof BlogFormSchema>) => {
    if (!editor) {
      toast.error("Editor not loaded yet");
      return;
    }

    const currentTextContent = editor.getText() || "";

    if (currentTextContent.trim().length < 50) {
      toast.error("Content should be at least 50 characters long");
      return;
    }

    setIsUploading(true);
    try {
      let coverImageUrl = "";
      if (coverImage) {
        coverImageUrl = await uploadToCloudinary(coverImage);
      }

      const blog_data = {
        title: data.title,
        content: data.content,
        author_id: data.author_id,
        cover_image: coverImageUrl,
      };

      const response = await axiosInstance.post("/blogs/create", blog_data);

      if (response.data.success) {
        toast.success(response.data.message);
        router.refresh();
        form.reset();
        form.clearErrors();
        editor.commands.clearContent();
        setTextContent("");
        setCoverImage(null);
        router.refresh();
      } else {
        console.log(response);
        toast.error(response.data.success.message || "Failed to create blog");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Error creating blog:", axiosError);
      toast.error(axiosError.response?.data.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  return (
    <article className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      <div className="w-full flex flex-col justify-start items-start mt-5">
        <h1 className="text-3xl font-bold">Create New Blog</h1>
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
                    {textContent.length > 0 && textContent.length < 50 && (
                      <p className="text-sm text-destructive mt-2">
                        Content should be at least 50 characters (currently:{" "}
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
                        Image selected: {coverImage.name}
                      </p>
                    )}
                  </div>
                </FormControl>
              </FormItem>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={textContent.length < 50 || isUploading}
                >
                  <Rss className="mr-2" />
                  {isUploading ? "Uploading..." : "Create Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </article>
  );
};

export default CreateNewBlog;
