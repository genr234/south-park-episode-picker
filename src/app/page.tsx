"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white items-center justify-center flex flex-col p-16 rounded-md">
          <Image
            src={"/logo.png"}
            width={200}
            height={200}
            alt="South Park Logo"
            className="pb-4"
          />
          <h1 className="text-1xl md:text-4xl pb-4">
            South Park Episode Picker
          </h1>
          <Button
            onClick={() => {
              window.location.href = `/${Math.floor(Math.random() * 314)}`;
            }}
          >
            Let&apos;s go!
          </Button>
        </div>
      </div>
    </>
  );
}
