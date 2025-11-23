"use client";
// import { useAppSelector } from "@/utils/store";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = useAppSelector((state) => state.user);
  // const router = useRouter();
  // useEffect(() => {
  //   console.log(user);

  //   if (!user.isAuthenticated) {
  //     router.replace("/signin");
  //   }
  // }, []);
  return (
    <div className="w-full min-h-screen">
      <HeaderComponent />
      {children}
    </div>
  );
}
