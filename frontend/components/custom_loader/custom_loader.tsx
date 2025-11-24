import { Spinner } from "../ui/spinner";

const CustomLoader = () => {
  return (
    <div className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-center items-center">
      <Spinner className="h-8 w-8" />
      <p className="mt-4 text-muted-foreground">We are finding your blogs...</p>
    </div>
  );
};

export default CustomLoader;
