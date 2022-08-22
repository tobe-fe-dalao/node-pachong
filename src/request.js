const axios = require("axios");
const { mergeObject } = require("fastool");
const config = require("./config");
const defaultOptions = {
  method: "GET",
  data: {},
  params: {},
  headers: config.headers,
};
class Request {
  constructor(cookie) {
    this.cookie = cookie || "";
  }
  request(options) {
    return new Promise((resolve, reject) => {
      options = Object.assign({}, options, {
        headers: {
          cookie: this.cookie || "",
        },
      });
      const opts = mergeObject(defaultOptions, options);
      axios(opts)
        .then((res) => {
          let data = res.data || {};
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 举例 查询掘金用户信息
  queryUserProfile() {
    return this.request({
      method: "GET",
      url: "https://api.juejin.cn/user_api/v1/user/get",
    });
  }
}
module.exports = Request;
