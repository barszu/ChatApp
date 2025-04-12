import "./bootstrap.js";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { getRevievedCode } from "./services/externalLLM.js";
import {
  addChatMessage,
  getChatMessages,
} from "./controllers/chatController.js";

const app = express();
const port = process.env.PORT || 8000;
const frontendURL = process.env.FRONTEND_URL;

if (!process.env.FRONTEND_URL) {
  Error("Please set the FRONTEND_URL environment variable");
}

app.use(cors({ origin: frontendURL }));

app.use(express.json());

const reviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // maximum 10 requests per IP
  message: "Too many requests, please try again later.",
});

app.get("/", (req, res) => {
  res.send("Backend seerver is running!");
});

app.get("/api/review", async (req, res) => {
  try {
    const chatMessages = await getChatMessages();
    return res.json(chatMessages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/review", reviewLimiter, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "The field 'message' is required" });
  }

  try {
    const llmResponse = await getRevievedCode(message);
    const chatMessage = await addChatMessage(message, llmResponse);
    return res.json({ response: llmResponse, chatMessage: chatMessage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
