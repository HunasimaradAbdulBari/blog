const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

// Import routes
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

// Import models
const { default: mongoose } = require("mongoose");
const Blog = require("./models/blog");

const app = express();
const PORT = 8000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sanoofblog')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Routes
app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate("createdBy");
  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));