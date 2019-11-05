#!/usr/bin/env node
const fs = require("fs");
const PATTERN = /^[@\^~]{1}/;
const SORRY_MESSAGE = "We had a trouble writing your package😢 However, you can insert it on your own.\r\n"

const replaceWithFixed = () => {
  fs.readFile("./package.json", (err, data) => {
    if (err) return console.error('No package.json in this folder.');
    const pack = JSON.parse(data);
    if (pack.hasOwnProperty("dependencies")) {
      for (dependency in pack.dependencies) {
        pack.dependencies[dependency] = pack.dependencies[dependency].replace(
          PATTERN,
          ""
        );
      }
    }
    if (pack.hasOwnProperty("devDependencies")) {
      for (dependency in pack.devDependencies) {
        pack.devDependencies[dependency] = pack.devDependencies[
          dependency
        ].replace(PATTERN, "");
      }
    }

    fs.writeFile("package.json", JSON.stringify(pack, undefined, 2), err =>
      console.log(err ? SORRY_MESSAGE + pack: "File have been repalced")
    );
  });
};

replaceWithFixed();
