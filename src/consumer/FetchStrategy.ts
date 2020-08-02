import AbstarctStrategy from "./AbstarctStrategy";
import axios from 'axios';
import qs from 'qs';

export default class FetchStrategy extends AbstarctStrategy {
    consume(params: IConsumeParams): Promise<any> {
        return axios.post(params.api, qs.stringify(params), {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
    }
}