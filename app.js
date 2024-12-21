const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/",(req,res)=>{
  res.redirect('/blogs');
});

app.get("/about",(req,res)=>{
  res.render("about",{title:"About"});
});

app.use("/blog",blogRoutes);

//これは最後にすべき
app.use((req,res)=>{
  res.status(404).render("404",{title:"404"});
});