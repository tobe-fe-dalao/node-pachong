const chalk = require("chalk");

const print = (text, color = "green") => {
  console.log(chalk[color](text));
};

// print("green", "> 执行当前任务");
module.exports = print;
