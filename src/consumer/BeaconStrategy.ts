import AbstarctStrategy from "./AbstarctStrategy";

export default class BeaconStrategy extends AbstarctStrategy {
    consume(params: IConsumeParams): Promise<any> {
        if (!window || !window.navigator || "function" != typeof window.navigator.sendBeacon) {
            return Promise.reject(new Error("current enviment not support sendBeacon!"));
        }
        let paramsForm: FormData = new FormData(); 
        for (let key in params) {
        paramsForm.append(key, params[key]);
        }
        return new Promise((resolve, reject) => {
            window.navigator.sendBeacon(params.api, paramsForm) ? resolve() : reject();
        })
    }
}