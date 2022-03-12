const express = require("express");
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videoRoute");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);

// start Express on port 5050
app.listen(5050, () => {
  console.log("Server Started on http://localhost:5050");
  console.log("Press CTRL + C to stop server");
});
