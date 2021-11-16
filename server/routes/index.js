const router = require("express").Router();

const listingRoutes = require("./listing.routes");
const reservationRoutes = require("./reservation.routes");

router.use("/api/listings", listingRoutes);
router.use("/api/reservations", reservationRoutes);

module.exports = router;