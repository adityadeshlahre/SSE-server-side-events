import express from "express";

const app = express();

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const interval = setInterval(() => {
    const randomValue = Math.random();
    res.write(`data: ${randomValue}\n\n`);
    console.log("Sent:", randomValue);
  }, 1000);

  req.on("close", () => clearInterval(interval));
});

app.listen(3001, () => {
  console.log("Random SSE source running on http://localhost:3001/events");
});
