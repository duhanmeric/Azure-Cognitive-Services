const express = require("express");
const cors = require("cors");
const path = require("path");
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const { promisify } = require("util");
const { v4 } = require("uuid");
const { serviceRegion, subscriptionKey } = require("./keys");
const serveStatic = require("serve-static");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const writeFile = promisify(fs.writeFile);
const readDir = promisify(fs.readdir);

const audioFolder = path.join(__dirname + "/audios/");

console.log(path.join(__dirname + "/audios/"));

if (!fs.existsSync(audioFolder)) {
  fs.mkdirSync(audioFolder);
}

const staticFileMiddleware = serveStatic(
  path.join(__dirname + "/client/build/")
);
app.use(staticFileMiddleware);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/audio", (request, response) => {
  let allAudioFiles = [];

  readDir(audioFolder, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        allAudioFiles.push({
          id: Math.random() * 10000,
          file: `https://bulut-final.herokuapp.com/audios/${file}`,
        });
      });
      response.send(allAudioFiles);
    }
  });
});

app.get("/audios/:id", (request, response) => {
  const { id } = request.params;
  response.sendFile(audioFolder + id);
});

app.post("/audio", (request, response) => {
  const { message } = request.body;
  console.log("xd");

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

    response.writeHead(200, {
      "Content-Type": "audio/mpeg",
    });

    writeFile(audioFolder + permanentId + ".mp3", buffer, "base64").then(() => {
      response.end("/audios/" + permanentId + ".mp3");
    });
    synthesizer = undefined;
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
