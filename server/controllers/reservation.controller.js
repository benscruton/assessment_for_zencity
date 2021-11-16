const Reservation = require("../models/reservation.model");
const Listing = require("../models/listing.model");

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
    Reservation.findByPk(req.params.id, {include: Listing})
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
    const r = Reservation.build(req.body);
    generateId()
      .then(id => {
        r.id = id;
        r.save()
          .then(reservation => {
            rsp.json(reservation.toJSON());
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

  update: (req, rsp) => {
    Reservation.findByPk(req.params.id)
      .then(reservation => {
        if(reservation === null){
          return rsp.json({error: "Not found"});
        }
        const fieldsNotUpdated = [];
        for(let key in req.body){
          if(key in reservation && key !== "id"){
            reservation[key] = req.body[key];
          }
          else{
            fieldsNotUpdated.push(key);
          }
        }
        reservation.save()
          .then(updatedReservation => {
            const output = {
              updated_reservation: updatedReservation.toJSON()
            };
            if(fieldsNotUpdated.length){
              output.fields_not_updated = fieldsNotUpdated;
            }
            rsp.json(output);
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

  updateMultiple: (req, rsp) => {
    if(typeof req.body !== "object"
      || !("query" in req.body)
      || !("newValues" in req.body)
    ){
      return rsp.json(queryFormatError);
    }
    Reservation.update(req.body.newValues, {where: req.body.query})
      .then(recordsUpdated => {
        const numRecordsUpdated = recordsUpdated[0];
        rsp.json({records_updated: numRecordsUpdated});
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
  } // If the id already exists, try again and make a new one
  return id;
}

const calculateNights = (startDate, endDate) => {
  try{
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const diff = endDate - startDate;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / millisecondsPerDay);
  }
  catch{
    return null;
  }
};

const queryFormatError = {
  error: "Request body formatted incorrectly.  Must include \"query\" and \"newValues\" properties.  See example format.",
  example_format: {
    query: {all: "desired", query: "terms"},
    newValues: {values: "to", be: "inserted"}
  }
}

module.exports = reservationController;