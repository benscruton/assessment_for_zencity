require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(cors(), express.json(), express.urlencoded({extended: true}));

// connect to database
const db = require("./server/config/database.config");
// const dbtest = async () => {
//   try{
//     await db.authenticate();
//     console.log("It worked!");
//   }
//   catch(e){
//     console.log(`Nope ya broke it:\n${e}`);
//   }
// };
// dbtest();

// console.log(require("./server/models/listing.model"));

const routes = require("./server/routes");
app.use(routes);

app.listen(port, () => console.log(`Listening on Port ${port}...`));