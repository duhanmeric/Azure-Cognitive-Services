const express = require("express");
const cors = require("cors");
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const { promisify } = require("util");
const { v4 } = require("uuid");
const { serviceRegion, subscriptionKey } = require("./keys");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const writeFile = promisify(fs.writeFile);
const audioFolder = "./client/src/audios/";
if (!fs.existsSync(audioFolder)) {
  fs.mkdirSync(audioFolder);
}

app.post("/audio", (request, response) => {
  const { message } = request.body;
  console.log(message);

  const speechConfig = speechsdk.SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  );

  let synthesizer = new speechsdk.SpeechSynthesizer(speechConfig);
  let permanentPath = audioFolder + v4() + ".mp3";

  synthesizer.speakTextAsync(message, function (result) {
    const audio = result.audioData;
    synthesizer.close();
    const buffer = Buffer.from(audio);
    writeFile(permanentPath, buffer, "base64").then(() => {
      console.log("here");
      response.status(201).json(permanentPath);
    });
    synthesizer = undefined;
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
