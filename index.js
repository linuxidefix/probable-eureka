import { getInput, setOutput, setFailed } from "@actions/core";
import { context } from "@actions/github";
const testFolder = "./";
const fs = require("fs");

try {
  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
      console.log(file);
    });
  });

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = getInput("who-to-greet");
  const version = getInput("version");
  const newVersion = new Number(version) + 1;
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  setOutput("time", time);
  setOutput("newVersion", newVersion);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  setFailed(error.message);
}
