import { use } from "react";

const MyBlogs = ({ params }: { params: Promise<{ profile_id: string }> }) => {
  const { profile_id } = use(params);
  return <div></div>;
};

export default MyBlogs;
