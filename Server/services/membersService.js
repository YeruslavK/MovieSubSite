const Members = require("../models/membersModel");

const getAllMembers = async () => {
  try {
    return await Members.find({});
  } catch (error) {
    throw error;
  }
};

const getMember = async (id) => {
  try {
    return await Members.findById(id);
  } catch (error) {
    throw error;
  }
};

const createMember = async (obj) => {
  try {
    const movie = new Members(obj);
    await movie.save();
    return `Created with id: ${movie._id}`;
  } catch (error) {
    throw error;
  }
};

const updateMember = async (id, obj) => {
  try {
    await Members.findByIdAndUpdate(id, obj);
    return "Updated!";
  } catch (error) {
    throw error;
  }
};

const deleteMember = async (id) => {
  try {
    await Members.findByIdAndDelete(id);
    return "Deleted!";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
};
