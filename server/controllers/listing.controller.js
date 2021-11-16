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

  filterAmenities: (req, rsp) => {
    Listing.findAll()
      .then(listings => {
        const filteredList = listings.map(listing => {
          listing = listing.toJSON();
          listing.amenities = (typeof listing.amenities === "string"?
            listing.amenities.toLowerCase().split(",")
            :
            []
          );
          return listing;
        }) // For all listings with amenities, separates into an array
        .filter(listing => 
          listing.amenities.includes(req.params.amenity)
        ); // Returns listings whose array includes the specified amenity
        rsp.json(filteredList);
      })
      .catch(e => {
        console.error(e);
        rsp.json({error: e});
      });
  },
};

module.exports = listingController;