const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./mock-data.sqlite",
  define: {
    timestamps: false
  },
  logging: false
});

// Check database connection and log status
sequelize.authenticate()
  .then(() => console.log("Database connection established"))
  .catch(e => console.log(`Database connection failed. Error message:\n\n${e}`));

module.exports = sequelize;