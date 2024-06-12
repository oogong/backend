const express = require("express");
const router = express.Router();
const stocks = require("../service/stocks");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/search/:keyword", async function (req, res, next) {
  const keyword = req.params.keyword;
  return res.json(await stocks.searchStocks(keyword));
});

module.exports = router;
