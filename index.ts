import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";

import { AdminRoute, VandorRoute } from "./routes";
import { MONGO_URL } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

mongoose
  .connect(MONGO_URL)
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => console.log(`error: ` + err));

app.listen(3030, () => {
  console.log(`App is listening to http://localhost:3030`);
});
