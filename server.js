const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/html-jv");

const User = mongoose.model("User", {
  email: String,
  password: String,
});

//cadastro

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.send("Usuário registrado com sucesso!");
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
