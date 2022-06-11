const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const { issuer, audience, algorithm } = require("./config");

const app = express();

const publicRouter = require("./routes/publicRoute");
const privateRouter = require("./routes/privateRoute");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),
  audience: `${audience}`,
  issuer: `${issuer}`,
  algorithms: [algorithm],
}).unless({ path: ["/api/public"] });

app.use(cors());
app.use(jwtCheck);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/public", publicRouter);
app.use("/api/private", privateRouter);

module.exports = app;
