const { print, sleep } = require("../src/utils");
const ProgressBar = require("progress");
const ora = require("ora");
const chalk = require("chalk");

(async () => {
  print("> 数据爬取开始");
  const spinner = ora({
    text: "等待数据接口",
    color: "blue",
  });
  spinner.start();
  setTimeout(() => {
    spinner.stop();
    print("> 接口已相应，准备爬取");
    const currentPage = 1;
    const pageLength = 50;
    const progress = new ProgressBar(":bar", { total: pageLength });

    for (let i = 0; i < pageLength; i++) {
      sleep(2000);
      progress.tick();
    }
  }, 2000);

  print("> 全部数据已完成");
})();
