const router = require("express").Router();
const reservationController = require("../controllers/reservation.controller");

router.route("/")
  .get(reservationController.index);

module.exports = router;