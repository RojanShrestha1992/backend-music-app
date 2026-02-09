const ImageKit = require("imagekit");

const ImageKitClient = new ImageKit({
    // privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})
// console.log("ImageKitClient:", ImageKitClient);


async function uploadFile(file){
    const result = await ImageKitClient.upload({
        file,
        fileName: "music_" + Date.now() + ".mp3",
        folder: "/music"

    })

    return result;
}

module.exports = {uploadFile}