"use client";
import { use } from "react";
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
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserProfileDetails = ({
  params,
}: {
  params: Promise<{ profile_id: string }>;
}) => {
  const { profile_id } = use(params);
  const profileForm = useForm();
  return (
    <article className="w-full max-w-[1100px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      this is the profile page of profile {profile_id}
    </article>
  );
};

export default UserProfileDetails;
