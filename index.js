const express = require("express");
const cors = require("cors");
const path = require("path");
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const { promisify } = require("util");
const { v4 } = require("uuid");
const { serviceRegion, subscriptionKey } = require("./keys");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/build/"));

const writeFile = promisify(fs.writeFile);
const readDir = promisify(fs.readdir);

const audioFolder = "./client/src/audios/";
// const audioFolder = path.join(__dirname + "\\client\\src\\audios/");

if (!fs.existsSync(audioFolder)) {
  fs.mkdirSync(audioFolder);
}

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/build/index.html");
});

app.get("/audio", (request, response) => {
  let allAudioFiles = [];

  readDir(audioFolder, (err, files) => {
    if (err) console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach((file) => {
        allAudioFiles.push(file);
      });
      // console.log(allAudioFiles);
      response.send(allAudioFiles);
    }
  });
});

app.post("/audio", (request, response) => {
  const { message } = request.body;

  const speechConfig = speechsdk.SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  );

  let synthesizer = new speechsdk.SpeechSynthesizer(speechConfig);
  var permanentId = v4();

  synthesizer.speakTextAsync(message, function (result) {
    const audio = result.audioData;
    synthesizer.close();
    const buffer = Buffer.from(audio);
    writeFile(audioFolder + permanentId + ".mp3", buffer, "base64").then(() => {
      console.log("here");
      response.status(201).json({ id: permanentId });
    });
    synthesizer = undefined;
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
