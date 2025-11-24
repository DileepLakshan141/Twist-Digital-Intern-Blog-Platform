"use client";
import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomLoader from "@/components/custom_loader/custom_loader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios_instance";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { uploadToCloudinary } from "@/utils/cloudinary/image_handler";
import { user_update } from "@/types/types";
import { ProfileSchema } from "@/schemas/user";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { UserPen } from "lucide-react";

const UserProfileDetails = ({
  params,
}: {
  params: Promise<{ profile_id: string }>;
}) => {
  const { profile_id } = use(params);

  const [loader, setLoader] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<user_update>({
    username: "",
    email: "",
    profile_pic: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const profileForm = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: "",
      email: "",
      profile_pic: "",
    },
  });

  const fetchUserDetails = async () => {
    try {
      setLoader(true);
      const response = await axiosInstance.get(`/users/details/${profile_id}`);

      if (response.data.success) {
        const data = response.data.data;
        setUserDetails(response.data.data);

        profileForm.setValue("username", data.username);
        profileForm.setValue("email", data.email);
        profileForm.setValue("profile_pic", data.profile_pic);

        toast.success(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    try {
      setIsUpdating(true);

      let finalImageUrl = userDetails.profile_pic;
      if (selectedImage) {
        finalImageUrl = await uploadToCloudinary(selectedImage);
      }

      const updatePayload = {
        username: userDetails.username,
        email: userDetails.email,
        profile_pic: finalImageUrl,
      };

      const response = await axiosInstance.put(
        `/users/update/${profile_id}`,
        updatePayload
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loader) {
    return (
      <CustomLoader
        params={{ loading_prompt: "Getting account details! Please wait" }}
      />
    );
  }

  if (!userDetails) return null;

  return (
    <article className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      <Card className="w-full max-w-[500px] mt-10">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">
            My Profile
          </CardTitle>
          <CardDescription className="text-center">
            Update your account details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userDetails.profile_pic} />
                  <AvatarFallback>
                    {userDetails.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setSelectedImage(e.target.files?.[0] || null)
                  }
                  disabled={isUpdating}
                  className="max-w-xs"
                />
              </div>

              <FormField
                control={profileForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button type="submit" disabled={isUpdating}>
                  <UserPen />
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Separator className="my-3" />
      <p className="text-muted-foreground">
        *NOTE: changes will take effect from your next session.
      </p>
    </article>
  );
};

export default UserProfileDetails;
