import express from "express";
import router from "./src/routes/routes.js";
import path from "path";
import { PORT } from "./config/env.js";
import { dbConnect } from "./database/index.js";
import cors from "cors";
const app = express();

dbConnect();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to JBN API");
});
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
