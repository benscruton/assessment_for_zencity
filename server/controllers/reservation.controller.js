const Reservation = require("../models/reservation.model");

const reservationController = {
  index: (req, rsp) => {
    Reservation.findAll({where: req.query})
      .then(data => {
        rsp.json(data);
      })
      .catch(e => {
        console.error(e);
        rsp.json({error: e});
      });
  },
};

module.exports = reservationController;