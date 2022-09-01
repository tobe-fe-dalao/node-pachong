const { print, sleep } = require("../../src/utils");
const ProgressBar = require("progress");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const ora = require("ora");

(async () => {
  const baseUrl = "http://www.31xs.org";
  //获取页面数据
  const pageData = await axios.get(`${baseUrl}/129/129473/`);
  //转换页面数据变为节点
  const $ = cheerio.load(pageData.data);
  //获取到所有章节标题节点（可通过f12查看）
  const $list = $("#list dl dd a");
  //查看有多少章
  print("> 接口已相应，准备爬取");

  const spinner = ora({
    text: "等待数据接口",
    color: "blue",
  });
  spinner.start();

  const pageLength = $list.length;
  const progress = new ProgressBar(":bar", { total: pageLength });

  //循环下载
  for (let i = 0; i < pageLength; i++) {
    const pageItemData = await axios.get(baseUrl + $list[i].attribs.href);
    const $$ = cheerio.load(pageItemData.data);
    let dataText = "";
    for (let j = 0; j < $$("#content p").length; j++) {
      dataText += $$("#content p")[j].children[0].data + "\n";
    }
    //写入文件
    fs.appendFileSync(
      "./修罗武神.txt",
      "\n\n" + $$(".bookname h1").text() + "\n\n" + dataText
    );
    spinner.color = "yellow";
    spinner.text = "数据写入中...";
    await sleep(5000);
    progress.tick();
    if (progress.complete) {
      print("爬取完成");
    }
  }

  print($list.length);
  // print(pageData.data);

  // console.log(pageData);
})();
