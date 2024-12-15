const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine","ejs");

//listen for requests
app.listen(3000);

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