const { print, sleep } = require("../src/utils");
const ProgressBar = require("../src/utils/progress");
const ora = require("ora");
const chalk = require("chalk");

(async () => {
  print("yellow", "> 数据爬取开始");
  const spinner = ora({
    text: "等待数据接口",
    color: "blue",
  });
  spinner.start();
  setTimeout(() => {
    spinner.stop();
    print("green", "> 接口已相应，准备爬取");
    const currentPage = 1;
    const pageLength = 50;
    const progress = new ProgressBar(
      `> 第${currentPage}页 下载进度`,
      pageLength
    );
    for (let i = 0; i < pageLength; i++) {
      sleep(2000);
      progress.render({ completed: i + 1, total: pageLength });
    }
  }, 2000);

  print("cyan", "> 全部数据已完成");
})();
