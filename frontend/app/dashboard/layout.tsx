"use client";
import HeaderComponent from "@/components/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <HeaderComponent />
      {children}
    </div>
  );
}
