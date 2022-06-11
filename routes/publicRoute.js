var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).send({
    status: 200,
    message: "success",
    result: "public access is called successfully",
  });
});

module.exports = router;
