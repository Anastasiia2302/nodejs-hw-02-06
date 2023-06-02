const mongoose = require("mongoose");

const app = require("./app");
const DB_HOST="mongodb+srv://Anastasiia:JUdewhNGYLnHzRYF@cluster0.ffsyvzp.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
    
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
