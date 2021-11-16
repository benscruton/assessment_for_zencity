const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./mock-data.sqlite",
  define: {
    timestamps: false
  }
});

console.log("running database config");

module.exports = sequelize;