"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function Episode({
  params,
}: {
  params: Promise<{ episode: number }>;
}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({
    name: "Loading...",
    thumbnail_url: "/placeholder.png",
    season: "Loading...",
    episode: "Loading...",
    air_date: "Loading...",
    description: "Loading...",
    wiki_url: "/",
  });
  const episode = use(params).episode;

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
        fetch(`https://spapi.dev/api/episodes/${episode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          res.json().then((data) => {
            setData(data.data);
            setLoading(false);
          });
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading, episode]);

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center text-gray-700">
                Loading Episode...
              </h2>
              <Progress value={progress} className="w-full" />
              <p className="text-center text-gray-500">{progress}%</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <div>
              <Button
                variant={"link"}
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <ChevronLeft />
              </Button>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-center text-gray-800">
                {data.name}
              </h1>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={data.thumbnail_url}
                  width={1920}
                  height={1080}
                  alt="Episode Thumbnail"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p>Season:</p>
                  <p>{data.season}</p>
                </div>
                <div>
                  <p>Episode:</p>
                  <p>{data.episode}</p>
                </div>
                <div>
                  <p>Air Date:</p>
                  <p>{data.air_date}</p>
                </div>
                <div>
                  <p>Description:</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"secondary"}>Show Description</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Description</DialogTitle>
                        <DialogDescription>
                          {data.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="w-full">
                <Button
                  className="w-full"
                  onClick={() => {
                    window.location.href = data.wiki_url;
                  }}
                >
                  More info + episode avaiable on Fandom
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
