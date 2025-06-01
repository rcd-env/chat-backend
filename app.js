const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
mongoose
  .connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error:", err));

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});

app.get("/", (req, res) => {
  res.render("home");
});

// create routes

app.get("/chats/new", (req, res) => {
  try {
    res.render("newChat");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

app.post("/chats", async (req, res) => {
  let { to, message, from } = req.body;
  await Chat.create({
    to,
    message,
    from,
  });
  res.redirect("/chats");
});

// read routes

app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find({});
    res.render("chats", { chats });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

// update routes

app.get("/chats/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findOne({ _id: id });
    res.render("editChat", { chat });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

app.post("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Chat.findOneAndUpdate(
      { _id: id },
      {
        message: req.body.message,
      }
    );
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

// delete routes

app.post("/chats/:id/delete", async (req, res) => {
  try {
    let { id } = req.params;
    await Chat.findOneAndDelete({ _id: id });
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});
