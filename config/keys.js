require("dotenv").config();


module.exports = {
    mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@terrace-chat-0-dvip2.mongodb.net/test?retryWrites=true&w=majority`,
    secretOrKey: `${process.env.SECRET_KEY}`
}