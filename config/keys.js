require("dotenv").config();

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@development-x4bdh.mongodb.net/test?retryWrites=true&w=majority`,
  secretOrKey: `${process.env.SECRET_KEY}`
};