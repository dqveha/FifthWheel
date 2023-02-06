const express = require("express");
const middlewareRouter = express.Router();
const { authentication } = require("../../middleware/auth");

middlewareRouter.post("/authenticate", authentication(), (req, res, next) => {
  const userProfile = res.locals.user;
  res.status(200).json({ message: "Authenticated", userProfile });
});

module.exports = {
  middlewareRouter,
};
