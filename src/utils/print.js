const chalk = require("chalk");

const print = (color, text) => {
  console.log(chalk[color](text));
};

// print("green", "> 执行当前任务");
module.exports = print;
