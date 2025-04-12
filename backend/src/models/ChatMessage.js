import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
