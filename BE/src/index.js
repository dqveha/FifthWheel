const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { middlewareRouter } = require("./routes/middleware/router.js");
const { automobilesRouter } = require("./routes/automobiles/router.js");

const app = express();
const apiRouter = express.Router();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const serverPort = 6060;
app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);

app.use(cors({ origin: ["http://127.0.0.1:5173"] }));

app.use("/api", apiRouter);
apiRouter.use("/middleware", middlewareRouter);
apiRouter.use("/automobiles", automobilesRouter);

module.exports = { app };

// console.log(`Used Car Dealerships index.js node v${process.versions.node}!`);
