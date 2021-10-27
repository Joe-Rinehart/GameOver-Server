require("dotenv").config();
const Express = require("express");
const db = require("./db");
let game = require('./controllers/gamecontroller')
let user = require('./controllers/usercontroller')
let review = require('./controllers/reviewcontroller')

const app = Express();

// Import middlewares as a bundle
const middlewares = require("./middleware");

// Parse the body of all requests as JSON
app.use(Express.json());
app.use(middlewares.CORS)
app.use("/user", user);
app.use("/game", game)
app.use("/review", review)

const resetDatabase = {force:true}
db.authenticate()
// add a resetDatabase inside the db.sync to drop all your tables if needed
// example:  .then(() => db.sync(resetDatabase))
// .then(() => db.sync(resetDatabase)) 
// ----> this resets the table
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
