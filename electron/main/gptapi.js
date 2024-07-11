import express from "express";
import cors from "cors"; // Import the cors module
import OpenAI from "openai";

const app = express();
const openai = new OpenAI();

// Enable All CORS Requests
app.use(cors());

let latestThread = undefined;

const myAssistant = await openai.beta.assistants.retrieve(
  "asst_DWGnWPdfkYH70ygcU8yTXXm4"
);

app.get("/getLatestThread", async (req, res) => {
  if (latestThread == undefined) {
    latestThread = await openai.beta.threads.create();
  }
  res.send(latestThread.id);
});

// Define a route that acts as a proxy to the Jisho API
app.get("/query", async (req, res) => {
  let query = req.query.query;
  let threadid = req.query.threadid;

  if (!threadid) {
    if (!latestThread) {
      latestThread = await openai.beta.threads.create();
    }
    threadid = latestThread.id;
  }

  console.log("Recieved query: " + query + " for thread: " + threadid);

  const message = await openai.beta.threads.messages.create(threadid, {
    role: "user",
    content: query,
  });

  const run = await openai.beta.threads.runs.create(threadid, {
    assistant_id: myAssistant.id,
    // model: "gpt-4-turbo-preview"
  });

  while (true) {
    const m2 = await openai.beta.threads.runs.retrieve(threadid, run.id);
    if (m2.status == "completed") {
      break;
    }
  }

  const messages = await openai.beta.threads.messages.list(threadid);

  return res.send(messages);
});






app.get("/stream", async (req, res) => {
  let query = req.query.query;
  let threadid = req.query.threadid;

  if (!threadid) {
    if (!latestThread) {
      latestThread = await openai.beta.threads.create();
    }
    threadid = latestThread.id;
  }

  console.log("Received query: " + query + " for thread: " + threadid);

  const message = await openai.beta.threads.messages.create(threadid, {
    role: "user",
    content: query,
  });

  const run = await openai.beta.threads.runs.create(threadid, {
    assistant_id: myAssistant.id,
    // model: "gpt-4-turbo-preview"
  });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  while (true) {
    const m2 = await openai.beta.threads.runs.retrieve(threadid, run.id);
    const messages = await openai.beta.threads.messages.list(threadid);

    res.write(`data: ${JSON.stringify(messages)}\n\n`);

    if (m2.status == "completed") {
      break;
    }
  }

  res.write(`data: [DONE]\n\n`);
  res.end();
});

// Start the server and listen on port 3000
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  //call the jisho route
  // fetch(
  //   "http://localhost:3002/query?query=give me some japanese words to learn"
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
});
