const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.services");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));
// console.log("UPLOAD RESULT:", result);
    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id, 
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
  } 



async function createAlbum(req, res) {
 

    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics
    })
    res.status(201).json({
      message:"Album created successfully",
      album:{
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics
      }
    });
  }





module.exports = { createMusic, createAlbum };
