"use client";
import {
  EllipsisVertical,
  PencilLine,
  Rss,
  MessageCircle,
  UserPen,
  LogOut,
  Home,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/utils/store";
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import { signout_user } from "@/utils/slices/user.slice";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios/axios_instance";

const HeaderComponent = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const response = await axiosInstance.post("/auth/signout");
      if (response.data.success) {
        dispatch(signout_user());
        router.replace("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }
  };

  return (
    <div className="w-full h-[70px] p-4 border-b flex justify-center items-center">
      <div className="w-full max-w-[1100px] flex justify-between items-center">
        {/* logo */}
        <Image src="/blgr.png" height={4} width={60} alt="blgr_logo_mini" />

        {/* links section */}
        <div className="hidden md:flex w-full max-w-[300px] justify-center items-center lg:flex">
          <Link href="/">
            <Button variant="outline">
              <Home /> Home
            </Button>
          </Link>
          <Link href="/dashboard/blogs">
            <Button className="ml-4" variant="outline">
              <Rss /> All Blogs
            </Button>
          </Link>
        </div>

        {/* user info */}
        {user.isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-center items-center">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={user.profile_pic} />
                  <AvatarFallback className="uppercase text-xl font-semibold rounded-lg">
                    {user.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start items-start ml-3">
                  <span className="text-lg font-semibold">{user.username}</span>
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
                <EllipsisVertical className="ml-5 " />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[300px] rounded-lg mt-2"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel>Welcome Back!</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard/blogs">
                  <DropdownMenuItem>
                    <MessageCircle />
                    All blogs
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/create_blog">
                  <DropdownMenuItem>
                    <PencilLine />
                    Create new blog
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/my_blogs/${user.user_id}`}>
                  <DropdownMenuItem>
                    <Rss />
                    My blogs
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/profile/${user.user_id}`}>
                  <DropdownMenuItem>
                    <UserPen />
                    My profile
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => logoutHandler()}>
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex">
            <Link href="/signin">
              <Button>Sign in</Button>
            </Link>
            <Link href="/signin">
              <Button className="ml-2">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
