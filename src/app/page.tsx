"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        const link = document.createElement("a");
        link.href = data.videoPath;
        link.download = "tiktok_video.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error(data.error);
        alert("Error while downloading video");
      }
    } catch (error) {
      console.error("Error while requesting download:", error);
      alert("Error while requesting download");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-4 bg-gray-50 dark:bg-gray-900 sm:p-8">
      <div className="w-full max-w-5xl text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
          easytiktokdlWeb
        </h1>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center w-full px-4 sm:px-0">
        <div className="mb-4 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Enter the URL of the TikTok video you want to download:
          </p>
        </div>
        <div className="relative z-10 flex w-full max-w-md flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
          <Input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.tiktok.com/@tiktokdlweb/video/7363799231418617121"
            className="flex-1 text-lg p-3"
          />
          <Button
            type="button"
            onClick={handleDownload}
            className="text-lg p-3 w-full sm:w-auto flex items-center justify-center"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4z"></path>
                </svg>
                <span>Downloading</span>
              </div>
            ) : (
              "Download"
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8 px-4 sm:px-0">
        <p className="text-center text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Step 1:</span> Copy the URL of the
          TikTok video.
        </p>
        <p className="text-center text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Step 2:</span> Paste it into the input
          field above.
        </p>
        <p className="text-center text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Step 3:</span> Click
          &quot;Download&quot; to save the video.
        </p>
      </div>
      <footer className="mt-8 text-center text-gray-700 dark:text-gray-300">
        <a
          className="flex items-center justify-center gap-2 p-4"
          href="https://github.com/SharkiPro"
          target="_blank"
          rel="noopener noreferrer">
          made with ❤️ by SharkiPro
        </a>
      </footer>
    </main>
  );
}
