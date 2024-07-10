import { downloadTikTokVideo } from "../../easytiktokdl";
import fs from "fs";
import path from "path";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: "Video URL is required" });
    }

    try {
      const outputPath = path.join(
        process.cwd(),
        "public",
        "downloads",
        "tiktok_video.mp4"
      );

      const isLocal = process.env.NODE_ENV === "development";

      const browser = await (isLocal
        ? puppeteer.launch({ headless: true }) // Use puppeteer in local development
        : puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
          }));

      const videoPath = await downloadTikTokVideo(
        browser,
        videoUrl,
        outputPath
      );

      await browser.close();

      res.status(200).json({ videoPath: "/downloads/tiktok_video.mp4" });
    } catch (error) {
      console.error("Error while downloading video:", error);
      res.status(500).json({ error: "Error while downloading video" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
