import { ChatMessage } from "../models/ChatMessage.js";
import dbConnect from "../util/dbConnect.js";

// Adds a chat message to the database
export async function addChatMessage(prompt, response) {
  try {
    await dbConnect();
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const chatMessage = new ChatMessage({ id, prompt, response });
    await chatMessage.save();
    return chatMessage;
  } catch (error) {
    throw new Error("Failed to add chat message: " + error.message);
  }
}

// Retrieves all chat messages from the database
export async function getChatMessages() {
  try {
    await dbConnect();
    return await ChatMessage.find();
  } catch (error) {
    throw new Error("Failed to fetch chat messages: " + error.message);
  }
}
