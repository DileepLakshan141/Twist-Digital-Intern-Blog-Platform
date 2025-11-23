import { toast } from "sonner";
import { CloudinaryResult } from "@/types/types";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const imageData = new FormData();
  imageData.append("file", file);
  imageData.append("upload_preset", "blog_uploads");
  console.log(
    "public cloud is: " + process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data: CloudinaryResult = await response.json();
    return data.secure_url;
  } catch (error) {
    toast.error("Cloudinary upload error!");
    console.log(error);

    throw error;
  }
};
