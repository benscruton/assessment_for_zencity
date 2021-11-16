require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(cors(), express.json(), express.urlencoded({extended: true}));

require("./server/config/database.config"); // connect database

const routes = require("./server/routes");
app.use(routes);

app.listen(port, () => console.log(`Listening on Port ${port}...`));