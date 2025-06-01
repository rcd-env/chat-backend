const mongoose = require("mongoose");
const chat = require("./models/chat.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error:", err));

chat.insertMany([
  {
    from: "Rakesh",
    to: "Aritra",
    message: "Ayee mara jayega ree!",
    created_at: new Date(),
  },
  {
    from: "Rakesh",
    to: "Annesh",
    message: "bhai mere 200₹",
    created_at: new Date(),
  },
  {
    from: "Sanya",
    to: "Rakesh",
    message: "I am with you bro.",
    created_at: new Date(),
  },
  {
    from: "Areeba",
    to: "Rakesh",
    message: "Chup Rakesh",
    created_at: new Date(),
  },
  {
    from: "Aritra",
    to: "Rakesh",
    message: "brooooo",
    created_at: new Date(),
  },
]);
