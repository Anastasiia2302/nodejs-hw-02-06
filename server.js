const mongoose = require("mongoose");


  // "mongodb+srv://Anastasiia:JUdewhNGYLnHzRYF@cluster0.ffsyvzp.mongodb.net/db-contacts?retryWrites=true&w=majority";

const app = require("./app");

const {DB_HOST} = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
