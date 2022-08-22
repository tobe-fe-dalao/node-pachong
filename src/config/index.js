module.exports = {
  cookie: "", //请求cookie
  // 邮箱配置-网易邮箱为例
  email: {
    provider: {
      auth: {
        user: process.env.EMAIL_USER || "", // 你的网易邮箱账号
        pass: process.env.EMAIL_PASS || "", // 你的网易邮箱 smpt 授权码
      },
      host: "smtp.163.com",
      secure: true,
      port: 465,
      secureConnection: true,
    },
  },
  //请求头
  headers: {
    origin: "https://juejin.cn", //请求头以掘金为例
    pragma: "no-cache",
    referer: "https://juejin.cn/",
    "sec-ch-ua":
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  },
  mysql: {
    host: "",
    user: "",
    port: 3306,
    password: "",
    database: "",
    charset: "utf8",
  },
  //钉钉机器人通知
  DINGTALK_WEBHOOK: "", // 你的钉钉机器人webhook
  DINGTALK_SECRET: "", // 你的PushPlus推送token
  //飞书机器人通知
  FEISHU_WEBHOOK: "",
  FEISHU_SECRET: "",
  //企业微信机器人通知
  WX_COMPANY_ID: "", // 企业 ID
  WX_APP_ID: "", // 应用 ID
  WX_APP_SECRET: "", //应用 secret
};
