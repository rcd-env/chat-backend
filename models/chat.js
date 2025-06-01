const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    minLength: 1,
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
module.exports = mongoose.model("Chat", chatSchema);
