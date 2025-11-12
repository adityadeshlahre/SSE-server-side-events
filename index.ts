import { fileURLToPath } from "bun";
import path from "path";
import express from "express";
import { getLatest } from "./sse";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/events", (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("data: Hello, this is a server-sent event!\n\n");

  const interval = setInterval(() => {
    res.write(`data: ${getLatest()}\n\n`);
  }, 1000);

  req.on("close", () => clearInterval(interval));
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
