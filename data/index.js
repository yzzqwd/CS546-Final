const userData = require("./users");
const healthData = require("./health");
const postData = require("./posts");
const groupData = require("./groups");
const exerciseData = require("./exercise");

module.exports = {
  health: healthData,
  users: userData,
  posts: postData,
  groups: groupData,
  exercise: exerciseData
};