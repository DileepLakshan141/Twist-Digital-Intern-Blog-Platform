"use client";
import { axiosInstance } from "@/axios/axios_instance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useAppDispatch } from "@/utils/store";
import { signin_user } from "@/utils/slices/user.slice";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const SignInPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const signInForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginFormSubmission = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const response = await axiosInstance.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        signInForm.reset();
        signInForm.clearErrors();
        dispatch(
          signin_user({
            user_id: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
            profile_pic: response.data.user.profile_pic,
            isAuthenticated: true,
          })
        );
        router.replace("/dashboard/blogs");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-screen absolute object-cover bg-no-repeat bg-[url('/background_blgr.png')] opacity-30 -z-10"></div>
      <div className="w-full h-screen flex flex-justify items-center ">
        <Card className="mx-4 w-full max-w-[450px] lg:max-w-[500px] m-auto">
          <CardContent>
            <Image
              src="/blgr.png"
              alt="blgr-logo"
              width={100}
              height={10}
              className="block m-auto"
            />
            <CardTitle className="text-2xl flex justify-center items-center">
              Welcome back to Blgr
            </CardTitle>
            <CardDescription className="text-center mt-2 mb-4">
              Continue sharing your voice. Pick up where you left off and manage
              your stories, drafts, and ideas with ease.
            </CardDescription>
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(loginFormSubmission)}>
                <div className="my-4">
                  <FormField
                    name="email"
                    control={signInForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="my-4">
                  <FormField
                    name="password"
                    control={signInForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <Button type="submit" className="w-full my-2">
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    signInForm.reset({
                      email: "",
                      password: "",
                    });
                    signInForm.clearErrors();
                  }}
                  className="w-full my-2"
                  variant="outline"
                >
                  Reset Form
                </Button>
              </form>
            </Form>
            <CardFooter className="mt-4 flex flex-col justify-center">
              <p className="text-center text-sm">
                Dont have an account?{" "}
                <Link className="font-semibold underline" href="/signup">
                  Signup
                </Link>{" "}
                here. <br /> Developed by Dileepa Lakshan
              </p>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
