const router = require("express").Router();
const listingController = require("../controllers/listing.controller");

router.route("/")
  .get(listingController.index);

router.route("/amenities/:amenity")
  .get(listingController.filterAmenities);

module.exports = router;