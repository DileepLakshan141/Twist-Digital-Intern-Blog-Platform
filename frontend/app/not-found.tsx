import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Image
        src="/empty.png"
        width={350}
        height={100}
        alt="not-found-placeholder"
      />
      <span className="text-3xl font-semibold">
        Page you looked not exists!
      </span>
    </div>
  );
};

export default NotFound;
