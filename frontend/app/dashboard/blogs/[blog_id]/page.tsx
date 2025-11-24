"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import { blog, comment } from "@/types/types";
import { axiosInstance } from "@/axios/axios_instance";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CloudOff, MessageSquareMore, Send, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/schemas/blog";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import CommentCard from "@/components/comment_card/CommentCard";

const ReadBlogContent = ({
  params,
}: {
  params: Promise<{ blog_id: string }>;
}) => {
  const { blog_id } = use(params);

  const [blogDetails, setBlogDetails] = useState<blog | null>(null);
  const [comments, setComments] = useState<comment[] | []>([]);
  const [blogLikes, setBlogLikes] = useState<number>(0);

  const fetchBlogDetails = async () => {
    try {
      const response = await axiosInstance.get(`/blogs/${blog_id}`);
      if (response.data.success) {
        setBlogDetails(response.data.target_blog);
        setBlogLikes(response.data.target_blog.likes);
      } else {
        setBlogDetails(null);
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/blog/${blog_id}`);
      console.log(response);

      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        setComments([]);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setComments([]);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data.message ||
          "looks like your session expired! try login again!"
      );
    }
  };

  const likeBlogPost = async () => {
    try {
      const response = await axiosInstance.post(`/likes/add/${blog_id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setBlogLikes((prev) => prev + 1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBlogDetails();
      await fetchComments();
    };
    fetchData();
  }, []);

  const commentForm = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const commentSubmitter = async (values: z.infer<typeof CommentSchema>) => {
    try {
      const validation_check = CommentSchema.safeParse(values);
      if (validation_check) {
        const response = await axiosInstance.post("/comments/create", {
          content: values.comment,
          blog_id,
        });

        console.log(response);

        if (response.data.success) {
          toast.success(response.data.message);
          setComments((prev) => [...prev, response.data.comment]);
          commentForm.reset();
          commentForm.clearErrors();
        } else {
          toast.error(response.data.message);
        }
      } else {
        return toast.error("validation check failed");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <div className="w-full max-w-[1100px] min-h-[700px] m-auto px-2 flex justify-center items-start gap-2 flex-wrap">
      {/* blog data displayer */}
      <article className="my-2 w-full min-h-[500px] max-w-[700px] flex flex-col justify-start items-center border rounded-lg mt-5">
        {blogDetails !== null ? (
          <div className="h-full min-h-[700px] my-3 w-full flex flex-col justify-start items-left px-4">
            <h1 className="text-4xl font-semibold text-center">
              {blogDetails.title}
            </h1>
            <Separator className="my-2" />
            <img
              src={blogDetails.cover_image}
              alt={blogDetails.title}
              className="w-full rounded-lg"
            />
            <Separator className="my-2" />
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                Blog Author:
              </span>

              <div className="flex justify-between items-center gap-3 p-2 rounded-xl bg-secondary/40">
                <div className="flex">
                  <Avatar className="h-12 w-12 rounded-xl">
                    <AvatarImage
                      src={blogDetails.author.profile_pic}
                      className="rounded-xl"
                    />
                    <AvatarFallback className="uppercase text-lg">
                      {blogDetails.author.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col leading-tight ml-4">
                    <span className="font-semibold text-base">
                      {blogDetails.author.username}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Created On:{" "}
                      {dayjs(blogDetails.createdAt).format("DD MMM, YYYY")}
                    </span>
                  </div>
                </div>

                <Button
                  className="flex items-center gap-2"
                  onClick={() => likeBlogPost()}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{blogLikes}</span>
                  <span>Like this blog</span>
                </Button>
              </div>
            </div>

            <Separator className="my-2" />
            {blogDetails && (
              <article
                className="prose max-w-none ProseMirror"
                dangerouslySetInnerHTML={{ __html: blogDetails.content }}
              />
            )}
          </div>
        ) : (
          <Empty className="m-auto">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CloudOff />
              </EmptyMedia>
              <EmptyTitle>Blog Details Not Found!</EmptyTitle>
              <EmptyDescription>
                Looks like the details of the blog not found in db or connection
                issue occurred. Please refresh your page to troubleshoot.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </article>
      {/* comments holder */}
      <section className="my-2 w-full h-screen max-h-[700px] flex flex-col justify-start items-center border rounded-lg mt-5 md:max-w-[350px]">
        <span className="text-2xl font-bold capitalize my-2">Comments</span>
        <Separator />
        {comments.length < 1 ? (
          <Empty className="m-auto">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageSquareMore />
              </EmptyMedia>
              <EmptyTitle>No Comments Yet!</EmptyTitle>
              <EmptyDescription>
                No comments have published for this blog yet. Be the first one
                to comment for this blog
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="h-screen my-3 w-full flex flex-col justify-start px-2 rounded-lg">
            {comments.map((comment: comment) => {
              return <CommentCard comment_info={comment} key={comment._id} />;
            })}
          </div>
        )}
        <div className="mx-2 rounded-lg p-2 w-full flex justify-evenly">
          <Form {...commentForm}>
            <form
              className="w-full flex"
              onSubmit={commentForm.handleSubmit(commentSubmitter)}
            >
              <FormField
                name="comment"
                control={commentForm.control}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full mr-2">
                      <FormControl>
                        <Input
                          placeholder="Enter your comment here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" size="icon">
                <Send />
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default ReadBlogContent;
