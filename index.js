const express = require("express");
const path = require("path"); // ✅ Add this line
// const mongoose = require(mongoose);
const userRoute =require('./routes/user');
const { default: mongoose, mongo } = require("mongoose");
const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/sanoofblog').then(e => console.log("mongoDB connected"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/user',userRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
