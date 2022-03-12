const express = require("express");
const router = express.Router();
const videoInfo = require("../data/videoInfo.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readVideos() {
  const videoData = fs.readFileSync("./data/videoInfo.json");
  const parsedVideos = JSON.parse(videoData);
  return parsedVideos;
}

function writeVideo(newVideo) {
  const videoDataAsString = JSON.stringify(newVideo);
  fs.writeFileSync("./data/videoInfo.json", videoDataAsString);
}

router.get("/", (req, res) => {
  const videoList = videoInfo.map((video) => {
    return {
      id: video.id,
      title: video.title,
      image: video.image,
      channel: video.channel,
    };
  });
  res.json(videoList);
});

router.get("/:videoId", (req, res) => {
  const videoByID = videoInfo.find((video) => video.id === req.params.videoId);
  if (!videoByID) {
    return res.status(404).send("Video does not exist");
  }
  res.json(videoByID);
});

router.post("/", (req, res) => {
  const updatedVideos = readVideos();
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Brian and Bryan",
    description: req.body.description,
    image: "http://localhost:5050/assets/image8.jpeg",
    views: "0",
    likes: 0,
    duration: "05:50",
    timestamp: 1647107810,
    video: "",
    comments: [],
  };

  if (!newVideo.title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!newVideo.description) {
    return res.status(400).json({
      message: "Description is required",
    });
  }

  updatedVideos.push(newVideo);
  writeVideo(updatedVideos);
  res.status(201).json(newVideo);
});

module.exports = router;
