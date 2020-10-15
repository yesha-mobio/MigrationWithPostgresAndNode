require("dotenv").config("/.env");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const models = require("./models");
const isAuth = require("./middleware/is-auth");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: {
//     models,
//   },
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log("HEADERS", req.headers);
    const user = req.body;
    console.log(user);
    return user;
  },
});

var app = express();
server.applyMiddleware({ app });

app.use(isAuth);

models.sequelize.authenticate();
models.sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.listen(() => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});

module.exports = app;
