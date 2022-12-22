const mongoose=require("mongoose");
require("dotenv").config()
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    
    
};

module.exports = connectDatabase;