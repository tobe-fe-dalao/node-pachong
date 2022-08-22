const fs = require("fs");
const path = require("path");

/**
 * @description: 读取路径信息，判断路径是否存在
 * @param { string } path
 * @return {Promise().then(false|stats)}
 */
function isHasPath(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

/**
 * @description: 创建路径
 * @param { string } dir 路径
 * @return {Promise().then(true|false)}
 */
function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * @description: 判断路径是否存在，如果不存在则创建
 * @param { string } dir
 * @return {boolean}
 */
async function dirExists(dir) {
  let isExists = await getStat(dir);
  if (isExists && isExists.isDirectory()) {
    return true;
  }

  //如果该路径不存在
  let tempDir = path.parse(dir).dir; //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);

  let mkdirStatus;
  if (status) {
    // 如果路径存在则创建文件夹
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}
module.exports = {
  isHasPath,
  mkdir,
  dirExists,
};
