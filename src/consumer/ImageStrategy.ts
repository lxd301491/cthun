import AbstarctStrategy from "./AbstarctStrategy";

export default class ImageStrategy extends AbstarctStrategy {
    consume(params: IConsumeParams): Promise<any> {
        let img = new Image(1, 1);
        return new Promise((resolve, reject) => {
          img.onerror = (err) => {
            reject(err);
          };
          img.onload = (resp) => {
            resolve(resp);
          };
          img.onabort = (resp) => {
            reject(resp);
          };
          let paramsArr: string[] = []; 
          for (let key in params) {
            paramsArr.push(`${key}=${params[key]}`)
          }
          img.src = params.api + "?" + paramsArr.join("&");
        })
    }
}