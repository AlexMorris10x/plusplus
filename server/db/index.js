const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let MONGO_URL;
// const MONGO_LOCAL_URL =
//   "mongodb://plusplus_user:Free4all!@ds259518.mlab.com:59518/heroku_fdhlskkw";
const MONGO_LOCAL_URL = "mongodb://localhost/myplusplusapp";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
  MONGO_URL = process.env.MONGODB_URI;
} else {
  mongoose.connect(MONGO_LOCAL_URL);
  MONGO_URL = MONGO_LOCAL_URL;
}

const db = mongoose.connection;
db.on("error", err => {
  console.log(`There was an error connecting to the database: ${err}`);
});
db.once("open", () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGO_URL}`
  );
});

module.exports = db;
