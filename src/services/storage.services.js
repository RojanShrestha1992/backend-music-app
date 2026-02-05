const {ImageKit} = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})


async function uploadFile(file){
    const result = await ImageKitClient.file.upload({
        file,
        fileName: "music_" + Date.now() + ".mp3",
        folder: "/music"

    })

    return result;
}

module.exports = {uploadFile}