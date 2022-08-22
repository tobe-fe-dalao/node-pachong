const DingBot = require("./ding-bot");
const wxWorkBot = require("./wx-bot");
const FeishuBot = require("./feishu-bot");
const config = require("../../config");

const dingBot = new DingBot({
  webhook: config.DINGTALK_WEBHOOK, // Webhook地址
  secret: config.DINGTALK_SECRET, // 安全设置：加签的secret
});

const feishuBot = new FeishuBot({
  webhook: config.FEISHU_WEBHOOK, // Webhook地址
  secret: config.FEISHU_SECRET, // 安全设置：加签的secret
});

module.exports = async function message(msg) {
  console.log(msg);
  dingBot.sendMessage(msg);
  wxWorkBot(msg);
  feishuBot.sendMessage(msg);
};
