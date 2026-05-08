const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

let posts = [];

// Home Page
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create Page
app.get("/create", (req, res) => {
  res.render("create");
});

// Add Post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  posts.push({
    id: Date.now(),
    title,
    content,
  });

  res.redirect("/");
});

// Edit Page
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  res.render("edit", { post });
});

// Update Post
app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});