const Stocks = require("../models/Stock");
const CustomError = require("../common/error/CustomError");

const searchStocks = async (keyword) => {
  const stock = await Stocks.find({ name: keyword });
  console.log(stock);

  if (stock.length === 0) {
    return new CustomError(404, "Stock is not found");
  }
  return { code: stock[0].code };
};

module.exports = {
  searchStocks,
};
