"use client";
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
import { UserSchema } from "@/schemas/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createNewUser } from "@/actions/signup";
import { toast } from "sonner";

const SignUpPage = () => {
  const signupForm = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const signupFormSubmission = async (values: z.infer<typeof UserSchema>) => {
    const response = await createNewUser(values);
    if (response.success) {
      toast.success(response.message);
      signupForm.reset();
      signupForm.clearErrors();
    } else {
      toast.error(response.message);
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
              Join Blgr Today
            </CardTitle>
            <CardDescription className="text-center mt-2 mb-4">
              Create your own space on the internet. Write, publish, and grow an
              audience with a platform built for storytellers.
            </CardDescription>
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(signupFormSubmission)}>
                <div className="my-4">
                  <FormField
                    name="username"
                    control={signupForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your user name"
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
                    name="email"
                    control={signupForm.control}
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
                    control={signupForm.control}
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
                <div className="my-4">
                  <FormField
                    name="confirm_password"
                    control={signupForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Retype your password"
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
                  Sign Up
                </Button>
                <Button
                  onClick={() => {
                    signupForm.reset({
                      username: "",
                      email: "",
                      password: "",
                      confirm_password: "",
                    });
                    signupForm.clearErrors();
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
                Already have an account?{" "}
                <Link className="font-semibold underline" href="/signin">
                  Signin
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

export default SignUpPage;
