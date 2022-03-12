require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videoRoute");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);

const SERVER_PORT = process.env.PORT || 8080;

app.listen(SERVER_PORT, () => {
  console.log(`Server Started on http://localhost:${SERVER_PORT}`);
  console.log("Press CTRL + C to stop server");
});
