import "./bootstrap.js";
import express from "express";
import { getRevievedCode } from "./services/externalLLM.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend seerver is running!");
});

app.post("/api/review", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "The field 'message' is required" });
  }

  try {
    const llmResponse = await getRevievedCode(message);
    return res.json({ response: llmResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
