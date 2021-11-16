const {DataTypes, Model} = require("sequelize");
const sequelize = require("../config/database.config");

class Reservation extends Model{}

Reservation.init({
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true
  },
  reference: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  door_key_code: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  guest_first_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  guest_last_name:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  guest_phone:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_rewards_member: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  guests_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  check_in_date: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  check_out_date: {
    type: DataTypes.TEXT,
    allowNull: true
  }
},
{
  sequelize,
  modelName: "reservation"
});

module.exports = Reservation;