const Subscriptions = require("../models/subsModel");

const getAllSubs = async () => {
  try {
    return await Subscriptions.find({});
  } catch (error) {
    throw error;
  }
};

const getSub = async (id) => {
  try {
    return await Subscriptions.findById(id);
  } catch (error) {
    throw error;
  }
};

const addSub = async (sub) => {
  try {
    // Log data before creating
    console.log("Creating subscription:", sub);

    return await Subscriptions.create(sub);
  } catch (error) {
    console.error("Error creating subscription:", error.message);
    throw error;
  }
};

const updateSub = async (id, sub) => {
  try {
    return await Subscriptions.findByIdAndUpdate(id, sub, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteSub = async (id) => {
  try {
    return await Subscriptions.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllSubs, getSub, addSub, updateSub, deleteSub };
