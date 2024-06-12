const Corporate = require("../models/Corporate");
const CustomError = require("../common/error/CustomError");

const searchCorporate = async (keyword) => {
  const corporate = await Corporate.find();
  console.log(corporate);

  if (corporate.length === 0) {
    return new CustomError(404, "Corporate is not found");
  }
  return { code: corporate[0].code };
};

module.exports = {
  searchCorporate,
};
