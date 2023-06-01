const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Anastasiia:JUdewhNGYLnHzRYF@cluster0.ffsyvzp.mongodb.net/db-contacts?retryWrites=true&w=majority";

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
