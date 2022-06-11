const express = require("express");
const router = express.Router();
const axios = require("axios");

const { domain } = require("../config");

router.get("/", async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const headers = { authorization: `Bearer ${accessToken}` };
    const user = await axios.get(`https://${domain}/userinfo`, { headers });

    res.status(200).send({
      status: 200,
      message: "success",
      result: user.data,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
