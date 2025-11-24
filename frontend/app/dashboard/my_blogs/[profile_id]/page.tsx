"use client";
import { htmlToText } from "@/utils/dom_parser/dom_parser";
import { use } from "react";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { blog } from "@/types/types";
import { toast } from "sonner";
import { axiosInstance } from "@/axios/axios_instance";
import CustomLoader from "@/components/custom_loader/custom_loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Brush, Delete, Eye, Rss } from "lucide-react";
import Link from "next/link";

const MyBlogs = ({ params }: { params: Promise<{ profile_id: string }> }) => {
  const { profile_id } = use(params);
  const [blogs, setBlogs] = useState<blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/blogs/myblogs/${profile_id}`);
      console.log(response);
      if (response.data.success) {
        setBlogs(response.data.my_blogs);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteClick = (blogId: string) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      setDeleting(true);
      const response = await axiosInstance.delete(
        `/blogs/delete/${blogToDelete}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setBlogs(blogs.filter((blog) => blog._id !== blogToDelete));
        setDeleteDialogOpen(false);
        setBlogToDelete(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(axiosError);
      toast.error(axiosError.response?.data.message);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  if (loading) {
    return (
      <CustomLoader
        params={{ loading_prompt: "Looking for your blogs. Please wait" }}
      />
    );
  }

  return (
    <div className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      <div className="w-full py-8">
        <h1 className="text-3xl font-bold mb-8">My Blogs</h1>

        {blogs.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <Brush />
              </EmptyMedia>
              <EmptyDescription>
                Looks like you have no blogs created. Lets get started by
                writing your first blog.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="w-full flex justify-end items-center border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="h-[250px] w-full p-3 md:w-[350px]">
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 p-6 w-full">
                    <div className="flex flex-col h-full">
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                        {blog.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {htmlToText(blog.content)}
                      </p>

                      <div className="flex gap-3 pt-3 border-t">
                        <Link href={`/dashboard/blogs/${blog._id}`}>
                          <Button>
                            <Eye /> View Blog
                          </Button>
                        </Link>
                        <Link href={`/dashboard/update_blog/${blog._id}`}>
                          <Button>
                            <Rss /> Update Blog
                          </Button>
                        </Link>
                        <Button onClick={() => handleDeleteClick(blog._id)}>
                          <Delete /> Delete Blog
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              blog and remove it from our database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Spinner className="h-4 w-4 mr-2" />
                  Deleting...
                </>
              ) : (
                "Yes, delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBlogs;
