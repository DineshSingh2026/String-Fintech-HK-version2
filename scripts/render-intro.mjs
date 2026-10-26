// Renders components/IntroStage.tsx into public/video/string-intro.mp4 (+ poster).
//
// Usage (with `npm run dev` running):
//   npm i --no-save puppeteer-core ffmpeg-static
//   node scripts/render-intro.mjs [baseUrl] [WIDTHxHEIGHT] [name]
//   e.g. node scripts/render-intro.mjs http://localhost:3001 1920x1080 string-intro-wide
//
// Uses the locally installed Google Chrome; set CHROME_PATH to override.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import puppeteer from "puppeteer-core";
import ffmpeg from "ffmpeg-static";

const BASE = process.argv[2] ?? "http://localhost:3001";
const [W, H] = (process.argv[3] ?? "1200x1200").split("x").map(Number);
const NAME = process.argv[4] ?? "string-intro";
const FPS = 30;
const DURATION = 18;
const OUT_DIR = "public/video";
const FRAMES = join(tmpdir(), `${NAME}-frames`);

const chrome =
  process.env.CHROME_PATH ??
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find(
    existsSync,
  );
if (!chrome) throw new Error("Chrome not found; set CHROME_PATH.");

rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(`${BASE}/render/intro?render=1&w=${W}&h=${H}`, { waitUntil: "networkidle0", timeout: 180_000 });
await page.waitForFunction("window.__ready === true", { timeout: 60_000 });

const total = FPS * DURATION;
for (let f = 0; f < total; f++) {
  const t = f / FPS;
  await page.evaluate((time) => window.__seek(time), t);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: join(FRAMES, `f_${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 92 });
  if (f % 30 === 0) process.stdout.write(`frame ${f}/${total}\n`);
}

// Poster: the first service in the spotlight.
await page.evaluate((time) => window.__seek(time), 6.8);
await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
await page.screenshot({ path: join(OUT_DIR, `${NAME}-poster.jpg`), type: "jpeg", quality: 85 });
await browser.close();

const run = (args) => {
  const r = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
};
const input = ["-y", "-framerate", String(FPS), "-i", join(FRAMES, "f_%04d.jpg")];
run([...input, "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", join(OUT_DIR, `${NAME}.mp4`)]);
run([...input, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-an", join(OUT_DIR, `${NAME}.webm`)]);

rmSync(FRAMES, { recursive: true, force: true });
console.log("Done:", join(OUT_DIR, `${NAME}.mp4`));
