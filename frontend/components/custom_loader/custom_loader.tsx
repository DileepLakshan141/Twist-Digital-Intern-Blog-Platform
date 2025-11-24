import { Spinner } from "../ui/spinner";

const CustomLoader = ({ params }: { params: { loading_prompt: string } }) => {
  const { loading_prompt } = params;
  return (
    <div className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-center items-center">
      <Spinner className="h-8 w-8" />
      <p className="mt-4 text-muted-foreground">{loading_prompt}...</p>
    </div>
  );
};

export default CustomLoader;
