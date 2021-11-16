const router = require("express").Router();
const reservationController = require("../controllers/reservation.controller");

router.route("/")
  .get(reservationController.index)
  .post(reservationController.create);

router.route("/:id")
  .get(reservationController.findById)
  .put(reservationController.update);


module.exports = router;