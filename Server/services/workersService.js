const Workers = require("../models/workersModel");

const getAllWorkers = async () => {
  try {
    return await Workers.find({});
  } catch (error) {
    throw error;
  }
};

const getWorker = async (id) => {
  try {
    return await Workers.findById(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkers,
  getWorker,
};
