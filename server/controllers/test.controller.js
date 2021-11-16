// const Game = require("../models/game.model");
// const {User} = require("../models/user.model");
// const createBoard = require("../GameBoards");
// const createSpecialInfo = require("../GameSpecialInfo");

const testController = {
  index: (req, rsp) => {
    rsp.json({message: "ok", source: "test.controller.js"});
  },

  postTest: (req, rsp) => {
    console.log(req.body);
    rsp.json({message: "ok", postBody: req.body});
  },

  shouldBePost: (req, rsp) => {
    rsp.json({message: "bad", reason: "Should be a post request pls"});
  },

  modelTest: (req, rsp) => {
    const greeting = require("../models/listing.model");
    console.log("this is in test.controller");
    rsp.json({message: "ok", greeting});
  },
};

module.exports = testController;