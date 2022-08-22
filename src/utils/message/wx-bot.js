const https = require("https");
const config = require("../../config");

function getToken({ id, secret }) {
  return new Promise((resolve, reject) => {
    const option = {
      hostname: "qyapi.weixin.qq.com",
      path: `/cgi-bin/gettoken?corpid=${id}&corpsecret=${secret}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = https.request(option, (res) => {
      const datas = [];
      let size = 0;
      res.on("data", (d) => {
        datas.push(d);
        size += d.length;
      });
      res.on("end", function () {
        const buff = Buffer.concat(datas, size);
        let result = buff.toString();
        if (result) {
          result = JSON.parse(result);
          if (result.errcode == 0) {
            console.log(`获取 accessToken 成功`);
            resolve(result.access_token);
          } else {
            reject(result.errmsg || "获取 accessToken 失败");
          }
        } else {
          reject("获取 accessToken 失败");
        }
      });
    });
    req.on("error", (error) => {
      reject(error);
    });
    req.end();
  });
}

function send({ agentId, touser = "@all", msgData, accessToken }) {
  return new Promise((resolve, reject) => {
    console.log("发送企业微信通知...");
    data = new TextEncoder().encode(
      JSON.stringify({
        touser,
        agentid: agentId,
        duplicate_check_interval: 600,
        ...msgData,
      })
    );
    const option = {
      hostname: "qyapi.weixin.qq.com",
      path: `/cgi-bin/message/send?access_token=${accessToken}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };
    const req = https.request(option, (res) => {
      const datas = [];
      let size = 0;
      res.on("data", (d) => {
        datas.push(d);
        size += d.length;
      });
      res.on("end", function () {
        const buff = Buffer.concat(datas, size);
        let result = buff.toString();
        if (result) {
          result = JSON.parse(result);
          if (result.errcode === 0) {
            console.log("发送通知成功");
            resolve();
          } else {
            reject(result.errmsg || "发送失败");
          }
        }
      });
    });
    req.on("error", (error) => {
      reject(error);
    });
    req.write(data);
    req.end();
  });
}

async function WXWorkNotify({ id, secret, agentId, touser, msgData }) {
  try {
    const accessToken = await getToken({ id, secret });
    await send({
      agentId,
      touser,
      msgData,
      accessToken,
    });
  } catch (error) {
    console.log(`发送失败 => ${error}`);
  }
}
let msg = "\n";
let timer = "";
const wxWorkBot = (message) => {
  if (config.WX_COMPANY_ID && config.WX_APP_ID && config.WX_APP_SECRET) {
    msg += message + "\n";

    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      WXWorkNotify({
        id: config.WX_COMPANY_ID, // 企业 ID
        agentId: config.WX_APP_ID, // 应用 ID
        secret: config.WX_APP_SECRET, // 应用 secret
        msgData: {
          msgtype: "text",
          text: {
            content: msg,
          },
        },
      });
    }, 500);
  }
};
module.exports = wxWorkBot;
