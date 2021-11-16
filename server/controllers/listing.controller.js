const Listing = require("../models/listing.model");

const listingController = {
  index: (req, rsp) => {
    Listing.findAll({where: req.query})
      .then(data => {
        rsp.json(data);
      })
      .catch(e => {
        console.error(e);
        rsp.json({error: e});
      });
  },
};

module.exports = listingController;