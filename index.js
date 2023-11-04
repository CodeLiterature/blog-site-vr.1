const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "A template blog site by CodeLiterature. It features dynamic additing of posts. Compose a blog page and post it here.";
const aboutContent = "CodeLiterature Is An Up And Coming Site In The Field Of Web Designing. Currently The Available Personal Is Able To Create Frontend Of Sites, Upgrade The Old Ones And Provide Consultation Regarding The Websites. Even Though Magitech Is New To The Digital World, It Believes In Progress And Evolution, And Aspires To Stand Among The Recognisable.";
const contactContent = "Contact us using the links given below in the footer. Alternatively, you can contact us through our email Address: codeliterature1@gmail.com";

const app = express();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const posts = [];
const jojo = [1,2,3,4];





app.get("/", (req, res) => {
  res.render("index", {txt: homeStartingContent, posts: posts});
  
})

app.get("/contact", (req, res) => {
  res.render("contact", {context: contactContent});
});

app.get("/about", (req, res) => {
  res.render("about", {Aboutext: aboutContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
const title = req.body.title;
const content = req.body.content;

  let post = {
    titletext: title,
    contenttext: content,
  }
  posts.push(post);
  
  res.redirect("/");
});

app.get("/posts/:post", (req, res) => {
 const paramtitle = req.params.post;

  posts.forEach(function(post){
    const givetitle = post.titletext;

    if (_.lowerCase(paramtitle) === _.lowerCase(givetitle)) {
      res.render("post", {postTitle: post.titletext, postContent: post.contenttext})
    }
  });
});
  


app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port 3000`);
});
