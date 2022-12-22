const express=require("express");
const cors=require("cors");
const { userRoute } = require("./routes/user.route");

const { blogRoute } = require("./routes/blog.route");
const { commentRoute } = require("./routes/comment.route");
const { bookmarkRoute } = require("./routes/bookmark.route");
const { likeRoute } = require("./routes/like.route");
const { followerRoute } = require("./routes/follower.route");
const connectDatabase = require("./config/db");
require("dotenv").config()
const PORT=process.env.PORT||3001

const app=express();
app.use(express.json())

app.use(cors({
    origin: "*",
  }
))

app.use("/",userRoute)    //user Route
app.use("/blog",blogRoute)  //blog Route
app.use("/comment",commentRoute)  //Comment Route
app.use("/bookmark",bookmarkRoute)  //BookMark Route
app.use("/like",likeRoute)          //Like Route
app.use("/follower",followerRoute)  //FollowerRoute

app.listen(PORT,async()=>{
    console.log("Server has started on Port no "+PORT)
    try{
        await connectDatabase;
        console.log("db connected")
    }catch(err){
        console.log("db not connected"+err.message)
    }
})

