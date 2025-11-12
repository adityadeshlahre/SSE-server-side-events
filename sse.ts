import { EventSource } from "eventsource";

let latestData = "waiting...";

const es = new EventSource("http://localhost:3001/events");

es.onmessage = (event) => {
  latestData = event.data;
  console.log("Got from 3001:", latestData);
};

es.onerror = (err) => console.error("Error from 3001 stream:", err);

export function getLatest() {
  return latestData;
}
