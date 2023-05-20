import axios from "axios";
// import Modal from "component/Common/LoaderModal";
import { Toast } from "./toast";
import { baserul } from "./config";

export const request = ({
  url = "",
  method = 'GET',
  data,
  isLoader = true,
  params
}) =>
  new Promise((resolve, reject) => {
    let config = {
      url: baserul + url,
      method: method,
      params: params ? params : null,
      data: data ? data : null,
      headers: {
        "Content-Type": "application/json",
      },
    };
    config.params == null && delete config.params;
    config.data == null && delete config.data;

    showLoader(isLoader);

    axios(config)
      .then((response) => {
        let {
          data: { message },
        } = response;
        showLoader(false);
        return resolve(response);
      })
      .catch(({ response }) => {
        showLoader(false);
        if (response) {
          let {
            status,
            data: { message },
          } = response;
          Toast({ type: "error", message: message });
        }

        return reject(response);
      });
  });

const showLoader = (status) => {
//   if (Modal && Modal.render && Modal.render.defaultProps) {
//     Modal.render.defaultProps.setLoaderStatus(status);
//   }
};
