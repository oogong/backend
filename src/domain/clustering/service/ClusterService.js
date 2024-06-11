const { PCA } = require("ml-pca");

const getClusterResult = async (stockList) => {
  const ids = [];
  const features = [];
  stockList.forEach((stock) => {
    const { id, profitability, stability, activity, potential, ogoong_rate } =
      stock;
    features.push([profitability, stability, activity, potential, ogoong_rate]);
    ids.push(id);
  });

  // scale 맞추기 -> 정규화
  const scaledFeatures = features.map((feature) => {
    const mean = feature.reduce((acc, val) => acc + val, 0) / feature.length;
    const std = Math.sqrt(
      feature.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
        feature.length
    );
    return feature.map((val) => (val - mean) / std);
  });

  // 주성분 분석
  const pca = new PCA(scaledFeatures);
  const pcaResult = pca.predict(scaledFeatures).to2DArray();

  console.log("--------------");
  console.log(pcaResult);

  // 2차원으로 변환
  const processedData = pcaResult.map((point, index) => [
    point[0],
    point[1],
    ids[index],
  ]);

  console.log(processedData);
};

module.exports = {
  getClusterResult,
};
