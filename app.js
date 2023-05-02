const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const credentials = require("./config/credentials");

//database-setup
require("./config/db");

//loading models
require('./models/User')
require('./models/Story')

const app = express();

//passport config(passing passport as an argument)
require("./config/passport");

//Setting view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//Setting static files
app.use(express.static("public"));

//sessions
app.use(
  session({
    secret: "secretKey",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: credentials.mongodb.url,
      ttl: 60 * 60,
    }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));
app.use('/profile',require('./routes/author'))



app.listen(credentials.PORT || 3000, () => {
  console.log("Server started on port " + credentials.PORT);
});
