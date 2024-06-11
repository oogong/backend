const express = require("express");
const router = express.Router();
// const dummyData = require("../data/DummyData.json");
const clusterService = require("../service/ClusterService");

router.post("/", async (req, res) => {
  const { stockList } = req.body;

  return res.json(await clusterService.getClusterResult(stockList));
});

module.exports = router;
