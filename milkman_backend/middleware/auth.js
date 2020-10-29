const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config("/.env");

module.exports = (req, res, next) => {
  try {
    const requestQuery = req.body.query;
    if (requestQuery !== undefined) {
      const excludeAPI = ["signin", "createUser", "getAllRoles"];

      if (
        !excludeAPI.some(function (v) {
          return requestQuery.indexOf(v) >= 0;
        })
      ) {
        const authHeader = req.headers.authorization || "";
        if (!authHeader) {
          res.status(401).send({ message: "You are not Logged In...!!" });
          next();
        }
        const token = authHeader.split(" ")[1];
        if (!token || token === "") {
          res.status(401).send({ message: "You are not Authenticated...!" });
          next();
        }

        const { user } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = user;
      }
    }
  } catch (error) {
    res.status(401).send({ message: error });
  }
  next();
};
