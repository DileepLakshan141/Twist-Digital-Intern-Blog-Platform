"use client";
import HeaderComponent from "@/components/header/header";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/axios/axios_instance";
import CustomLoader from "@/components/custom_loader/custom_loader";
import Image from "next/image";
import { MessageSquareQuote } from "lucide-react";
import BlogCard from "@/components/blog_card/blog_card";
import { blog } from "@/types/types";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState<blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/blogs/recent");
      if (response.data.success) {
        toast.success(response.data.message);
        setRecentBlogs(response.data.recent_blogs);
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setRecentBlogs([]);
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message,
      };
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      await searchBlogs();
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
        <Image
          className="mt-2"
          src="/blgr.png"
          width={300}
          height={40}
          alt="blgr-logo-main"
        />
        {/* motive text */}
        <p className="w-full max-w-[500px] text-center">
          &quot;Where thoughts find their voice and ideas meet their audience.
          Share your story with the world, one post at a time.&ldquo;
        </p>

        {loading ? (
          <CustomLoader
            params={{ loading_prompt: "Getting available blogs" }}
          />
        ) : (
          ""
        )}

        <h1 className="mt-4 font-semibold">Recently Created Blogs</h1>
        <Separator className="my-1.5 mb-5" />

        {recentBlogs.length < 1 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageSquareQuote />
              </EmptyMedia>
              <EmptyTitle>No Recently Created Blogs</EmptyTitle>
              <EmptyDescription>
                Looks like no blogs have created yet. Please check again later
                or check after few minutes.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <section className="w-full mb-8 gap-6 grid grid-cols-1 md:grid-cols-3 ">
            {recentBlogs.map((blog: blog) => {
              return <BlogCard blog_details={blog} key={blog._id} />;
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
