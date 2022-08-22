/**
 * 封装 fetch
 */

export const baseURL = 'http://120.55.12.109:8080/v1/api/';
// export const baseURL = 'http://localhost:8080/v1/api/';
export const getCookie = (name: string) => {
  const r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
};

export default function request(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: any,
  headers?: any,
  noJson?: boolean
) {
  if (method === "GET") {
    // fetch的GET不允许有body，参数只能放在url中
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }

  return fetch(baseURL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Access-Token": sessionStorage.getItem("access_token") || "", // 从sessionStorage中获取access token
      Authorization: sessionStorage.getItem("access_token") || "", // 从sessionStorage中获取access token
      ...headers,
    },
    body,
  }).then((res: Response) => {
    if (res.status !== 200) {
      return null;
    } else {
      return noJson ? res : res.json();
    }
  });
}

// GET 请求
export const get = (url: string, headers?: any) =>
  request("GET", url, undefined, headers);
// POST 请求
export const post = (url: string, body: any, headers?: any, noJson?: boolean) =>
  request("POST", url, body, headers, noJson);
// PUT 上传
export const put = (url: string, body: any) => request("PUT", url, body);
// DELETE 删除
export const del = (url: string, body: any) => request("DELETE", url, body);
