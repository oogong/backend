const { PCA } = require("ml-pca");
const { kmeans } = require("ml-kmeans");

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

  // 2차원으로 변환
  const pcaResultAndId = pcaResult.map((point, index) => [
    ids[index],
    point[0],
    point[1],
  ]);
  console.log(pcaResultAndId);

  // kmeans clustering
  const kmeansResult = kmeans(pcaResult, 5); // kmeans 함수 호출
  const clusterResult = Array.from({ length: 5 }, (_, id) => ({
    id,
    data: [],
  }));

  // 클러스터에 대한 id 매핑
  const clusteredData = kmeansResult.clusters.map((cluster, index) => {
    clusterResult[cluster].data.push({
      id: pcaResultAndId[index][0],
      x: pcaResultAndId[index][1],
      y: pcaResultAndId[index][2],
    });
  });
  return clusterResult;
};

module.exports = {
  getClusterResult,
};
