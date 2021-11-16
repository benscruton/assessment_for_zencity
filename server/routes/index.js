const router = require("express").Router();
// const path = require("path");

//   THESE WE'LL PUT BACK IN EVENTUALLY:
const listingRoutes = require("./listing.routes");
// const reservationRoutes = require("./reservation.roustes");

const testRoutes = require("./test.routes");

//   ADD THESE BACK TOO:
router.use("/api/listings", listingRoutes);
// router.use("/api/reservations", reservationRoutes);

router.use("/api/test", testRoutes);

//    THIS WE *LIKELY* WON'T NEED AT ALL
// router.use( (req, res) => {
// 	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

module.exports = router;