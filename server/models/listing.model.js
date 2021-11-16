const {DataTypes, Model} = require("sequelize");
const sequelize = require("../config/database.config");

class Listing extends Model{}

Listing.init({
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true
  },
  address_1: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address_2: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  state: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  zip_code:{
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  smart_lock_id: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  stairs: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  elevator: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  base_price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  amenities: {
    type: DataTypes.TEXT,
    allowNull: true
  }
},
{
  sequelize,
  modelName: "listing"
});

module.exports = Listing;