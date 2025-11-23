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

const CreateNewBlog = () => {
  const user = useAppSelector((state) => state.user);
  const [textContent, setTextContent] = useState("");

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
      setTextContent(editor.getText());
    },
  });

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      author_id: user.user_id || "default_user_id",
      cover_image: "",
    },
  });

  const onSubmit = (data: z.infer<typeof BlogFormSchema>) => {
    if (!editor) return;

    const content = editor.getHTML() || "";
    const currentTextContent = editor.getText() || "";

    console.log("Blog Data:", {
      ...data,
      content: content,
      plainText: currentTextContent,
    });

    if (currentTextContent.trim().length < 50) {
      alert("Content should be at least 50 characters long");
      return;
    }
  };

  return (
    <article className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      <section className="w-full flex flex-col justify-start items-start mt-5">
        <h1 className="text-3xl font-bold">Create New Blog</h1>
        <Separator className="my-3" />
      </section>

      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Blog Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
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
              </FormItem>

              {/* Cover Image Field */}
              <FormField
                control={form.control}
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={textContent.length < 50}
                >
                  <Rss />
                  Create Blog
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
