const Coperate = require("../models/Corporate");
const CustomError = require("../common/error/CustomError");

const searchCoperate = async (keyword) => {
  const coperate = await Coperate.find();
  console.log(coperate);

  if (coperate.length === 0) {
    return new CustomError(404, "Coperate is not found");
  }
  return { code: coperate[0].code };
};

module.exports = {
  searchCoperate,
};
