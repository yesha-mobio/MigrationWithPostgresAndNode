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
const authMiddleware = require("./middleware/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

// Authentication Middleware
app.use(authMiddleware);

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = req.user || null;
    const SECRET = process.env.JWT_SECRET;
    return {
      models,
      SECRET,
      user,
    };
  },
});

// Apply Middlewares to apollo requests
server.applyMiddleware({ app });

// Sequelize
models.sequelize.authenticate();
models.sequelize.sync();

// Node server
app.listen(() => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});

module.exports = app;
