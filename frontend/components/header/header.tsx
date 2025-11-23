"use client";
import {
  EllipsisVertical,
  PencilLine,
  Rss,
  MessageCircle,
  UserPen,
  ThumbsUp,
  MessageSquareHeart,
  LogOut,
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
import { logoutUser } from "@/actions/signout";
import { toast } from "sonner";
import { signout_user } from "@/utils/slices/user.slice";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        dispatch(signout_user());
        router.replace("/");
        toast.success(response.message);
      } else {
        toast.error(response.message);
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
        <div className="hidden md:flex w-full max-w-[300px] justify-evenly items-center lg:flex">
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">About Us</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Contact Us</Button>
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
                <DropdownMenuItem>
                  <MessageCircle />
                  <Link href="/dashboard/blogs">All blogs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PencilLine />
                  <Link href="/dashboard/create_blog">Create new blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Rss />
                  My blogs
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPen />
                  My profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ThumbsUp />
                  Liked blogs
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquareHeart />
                  Commented blogs
                </DropdownMenuItem>
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
