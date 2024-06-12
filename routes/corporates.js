const express = require("express");
const router = express.Router();
const corporates = require("../service/corporates");

router.get("/search/:keyword", async function (req, res, next) {
  const keyword = req.params.keyword;
  return res.json(await corporates.searchCorporate(keyword));
});

router.get("/include/:keyword", async function (req, res, next) {
  const keyword = req.params.keyword;
  return res.json(await corporates.searchIncludedCorporate(keyword));
});

module.exports = router;
