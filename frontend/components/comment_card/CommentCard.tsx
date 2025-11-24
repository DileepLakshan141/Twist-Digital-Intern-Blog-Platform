import { comment } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";

const CommentCard = ({ comment_info }: { comment_info: comment }) => {
  return (
    <div className="w-full flex flex-col justify-evenly items-start p-2 rounded-xl border bg-white my-1.5">
      {/* user avatar */}
      <div className="flex items-center">
        <Avatar className="h-9 w-9 rounded-xl">
          <AvatarImage
            className="rounded-xl"
            src={comment_info.user_id.profile_pic}
          />
          <AvatarFallback className="text-lg font-semibold uppercase">
            {comment_info.user_id.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col ml-2">
          <span className="text-base font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {comment_info.user_id.username}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {dayjs(comment_info.user_id.createdAt).format("DD MMMM, YYYY")}
          </span>
        </div>
      </div>

      {/*  comment body part */}
      <div className="flex flex-col w-full">
        <p className=" tex-sm mt-2 text-gray-800 dark:text-gray-200">
          {comment_info.comment}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
