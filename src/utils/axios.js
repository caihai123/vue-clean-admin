const InspireCloud = require("@byteinspire/js-sdk");
import { Message } from "element-ui";

const inspirecloud = new InspireCloud({
  serviceId: "qcrxr3",
});

const instance = (url, params = {}, options = {}) =>
  new Promise((resolve, reject) => {
    inspirecloud
      .run(url, params, options)
      .then((value) => {
        if (value.success) {
          resolve(value);
        } else {
          Message.error(value.message);
          reject(value);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export default instance;
