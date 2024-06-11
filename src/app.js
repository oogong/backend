const express = require("express");
const cors = require("cors");
const clusterRouter = require("./domain/clustering/api/ClusterController");

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not Allowed Origin!`));
    }
  },
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.set("port", process.env.PORT || 3001);
app.use("/api/cluster", clusterRouter);

app.listen(app.get("port"), () => {
  console.log("Start In ", app.get("port"), " Port");
});
