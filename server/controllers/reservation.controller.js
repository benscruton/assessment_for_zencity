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

  findById: (req, rsp) => {
    Reservation.findByPk(req.params.id)
      .then(reservation => {
        if(reservation === null){
          rsp.json({error: "Not found"});
        }
        else {
          const total_nights_booked = calculateNights(
            reservation.check_in_date,
            reservation.check_out_date
          );
          rsp.json({
            ...reservation.toJSON(),
            total_nights_booked
          });
        }
      })
      .catch(e => {
        console.error(e);
        rsp.json({error: e});
      });
  },

  create: (req, rsp) => {
    console.log(req.body);
    const r = Reservation.build(req.body);
    generateId()
      .then(id => {
        r.id = id;
        r.save()
          .then(reservation => {
            rsp.json({yourReservation: reservation});
          })
          .catch(e => {
            console.error(e);
            rsp.json({error: e});
          });
      })
      .catch(e => {
        console.error(e);
        rsp.json({error: e});
      });
  },

};

const generateId = async () => {
  const characters = "abcdefghijklmnopqrstuvwxyz11223344556677889900";
  let id = "";
  while(id.length < 16){
    id += characters[Math.floor(Math.random() * characters.length)];
  }
  const itemWithThisId = await Reservation.findByPk(id);
  if(itemWithThisId !== null){
    id = await generateId();
  }
  return id;
}

const calculateNights = (startDate, endDate) => {
  try{
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let diff = endDate - startDate;
    diff += 4000; // add about an hour to avoid daylight savings wonkiness
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / millisecondsPerDay);
  }
  catch{
    return null;
  }
};

module.exports = reservationController;