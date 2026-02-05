const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require("jsonwebtoken");
async function createMusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden: Only artists can upload music",
      });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });
    res.status(201).json({
      message: "Music uploaded successfully",
      music: {
        id: music._id,
        title: music.title,
        uri: music.uri,
        artist: music.artist,
      },
    });
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { createMusic };
