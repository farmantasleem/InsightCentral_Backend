const mongoose=require("mongoose");
require("dotenv").config()
const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://r:Farman@cluster0.ksgue.mongodb.net/insightcentral?retryWrites=true&w=majority")
    
    
};

module.exports = connectDatabase;