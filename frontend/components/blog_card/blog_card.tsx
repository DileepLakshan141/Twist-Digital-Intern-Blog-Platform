"use client";
import { blog } from "@/types/types";
import { htmlToText } from "@/utils/dom_parser/dom_parser";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ThumbsUp } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";

const BlogCard = ({ blog_details }: { blog_details: blog }) => {
  return (
    <div className="h-[450px] p-3 border rounded-lg md:h-[470px]">
      <img
        src={blog_details.cover_image}
        alt={blog_details.title}
        className="rounded-md w-full object-cover w-full h-[200px] mb-2.5"
      />
      <span className="text-lg capitalize font-semibold ">
        {blog_details.title}
      </span>
      <div className="w-full flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500 italic capitalize">
          created on {dayjs(blog_details.createdAt).format("DD-MMM-YYYY")}
        </span>

        <Badge>
          <ThumbsUp /> {blog_details.likes}
        </Badge>
      </div>
      <p className="line-clamp-3 mt-3">{htmlToText(blog_details.content)}</p>
      <Link href={`/dashboard/blogs/${blog_details._id}`}>
        <Button className="w-full mt-5">Read More</Button>
      </Link>
    </div>
  );
};

export default BlogCard;
