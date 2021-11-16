const router = require("express").Router();
const listingController = require("../controllers/listing.controller");

router.route("/")
  .get(listingController.index);

module.exports = router;