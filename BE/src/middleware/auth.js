const { users } = require("../../data/users");

const authentication = () => {
  return (req, res, next) => {
    const incomingUsername = req.body.username;
    const incomingPassword = req.body.password;
    const user = users.filter((user) => {
      return user.username === incomingUsername;
    });
    if (user.length < 1 || user.length > 1)
      return res.status(401).json({ message: "Access Denied" });
    if (user[0].password !== incomingPassword)
      return res.status(401).json({ message: "Access Denied" });
    res.locals.user = user[0];
    return next();
  };
};

module.exports = {
  authentication,
};
