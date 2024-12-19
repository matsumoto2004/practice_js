const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

const dbURI="mongodb+srv://matsumoto11:ZZ_T37j4auegLJ7@cluster0.wmf1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
.then((result)=>{
  app.listen(3000);
})
.catch((err)=>{
  console.log(err);
});

app.set("view engine","ejs");

app.get("/add-blog",(req,res)=>{
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog"
  });
  blog.save()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

app.get("/all-blogs",(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

app.get("/single-blog",(req,res)=>{
  Blog.findById("675ede580ae1a178a9592be3")
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.use(express.static("public"))
app.use(morgan("dev"));

app.get("/",(req,res)=>{
  const blogs=[
    // {title:"blog1",snippet:"snip1"},
    // {title:"blog2",snippet:"snip2"},
    // {title:"blog3",snippet:"snip3"}
  ];
  res.render("index",{title:"Home",blogs});
});

app.get("/about",(req,res)=>{
  res.render("about",{title:"About"});
});

app.get("/blogs/create",(req,res)=>{
  res.render("create",{title:"Create"});
})

//これは最後にすべき
app.use((req,res)=>{
  res.status(404).render("404",{title:"404"});
});