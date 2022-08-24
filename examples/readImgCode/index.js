const fs = require("fs");
const tesseract = require("node-tesseract");
const gm = require("gm");
const { print } = require("../../src/utils");

const image = require("path").resolve(__dirname, "code.jpg");
let test_image = require("path").resolve(__dirname, "code_1.jpg");

processImg(image, test_image)
  .then((text) => {
    print(`识别结果:${text}`);
  })
  .catch((err) => {
    print(`识别失败:${err}`, "red");
  });

function processImg(imgPath, newPath, thresholdVal) {
  return new Promise((resolve, reject) => {
    let imageMagick = gm.subClass({ imageMagick: true });
    imageMagick(imgPath)
      .despeckle()
      .contrast(-6)
      .write(newPath, (err) => {
        if (err) {
          reject(err);
        } else {
          tesseract.process(
            newPath,
            { l: "eng", psm: 7, binary: "tesseract" },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data.trim());
              }
            }
          );
        }
      });
  });
}
