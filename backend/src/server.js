import express from "express";
import { ENV } from "./config/env.js";

const app = express();
const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("Hello world");
});
console.log("Mongo URI: ", ENV.MONGO_URI);
app.listen(ENV.PORT, () => console.log(`Server is running on ${ENV.PORT}`));
