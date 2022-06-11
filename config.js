const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  audience: process.env.AUTH0_AUDIENCE_IDENTIFIER,
  domain: process.env.AUTH0_DOMAIN,
  issuer: process.env.AUTH0_ISSUER,
  algorithm: process.env.AUTH0_ALGORITHM,
};
