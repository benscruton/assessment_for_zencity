const Listing = require("../models/listing.model");

const listingController = {
  index: (req, rsp) => {
    Listing.findAll()
      .then(data => {
        rsp.json({message: "ok", results: data});
      })
      .catch(e => {
        console.error(e);
        rsp.json({error: e});
      });
      
    // rsp.json({message: "ok", source: "test.controller.js"});
  },
};

module.exports = listingController;