"use client";
import { useState } from "react";
import { axiosInstance } from "@/axios/axios_instance";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote, SearchCheck } from "lucide-react";
import { blog } from "@/types/types";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<blog[]>([]);
  return (
    <div className="w-full max-w-[900px] min-h-[700px] m-auto px-5 flex flex-col justify-start items-center">
      <Image
        className="mt-2"
        src="/blgr.png"
        width={170}
        height={40}
        alt="blgr-logo-main"
      />
      {/* motive text */}
      <p className="w-full max-w-[500px] text-center">
        &quot;Where thoughts find their voice and ideas meet their audience.
        Share your story with the world, one post at a time.&ldquo;
      </p>

      {/* search bar */}
      <section className="flex w-full my-4">
        <Input
          className="h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a search term"
        />
        <Button className="h-10 ml-3">
          <SearchCheck />
          Search Blogs
        </Button>
      </section>

      {searchResults.length < 1 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquareQuote />
            </EmptyMedia>
            <EmptyTitle>No Matching Blogs</EmptyTitle>
            <EmptyDescription>
              Looks like there are no blogs that matches your search term.
              Search again later or try a different search term.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <section className="w-full grid columns-auto auto-rows-auto"></section>
      )}
    </div>
  );
};

export default AllBlogs;
