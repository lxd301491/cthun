/**
 * 存储器
 * 用于存放所有埋点数据
 * appId 针对app的唯一标识，必须
 * maxSize 最大存放种类，必须
 * maxWidth 最大并发数量
 * localization 本地化对象，必须实现getItem和setItem方法
 */
import { randomString } from '../helpers';
import { around } from '../decorators';
import { handlers } from '../configs';

class DefaultStore implements IStore {
    private _kv: Map<string, any> = new Map();

    getItem<T>(key: string, callback?: (err: any, value: T) => void): Promise<T> {
        try {
            callback && callback(null, this._kv.get(key));
            return Promise.resolve(this._kv.get(key));
        } catch (e) {
            callback && callback(e, null);
            return Promise.reject(e);
        }
    }

    setItem<T>(key: string, value: T, callback?: (err: any, value: T) => void): Promise<T> {
        try {
            this._kv.set(key, value);
            callback && callback(null, value);
            return Promise.resolve(value);
        } catch (e) {
            callback && callback(e, null);
            return Promise.reject(e);
        }
    }

    removeItem(key: string, callback?: (err: any) => void): Promise<void> {
        try {
            this._kv.delete(key);
            callback &&  callback(null);
            return Promise.resolve();
        } catch (e) {
            callback && callback(e);
            return Promise.reject(e);
        }
    }

    clear(callback?: (err: any) => void): Promise<void> {
        try {
            this._kv.clear();
            callback && callback(null);
            return Promise.resolve();
        } catch (e) {
            callback && callback(e);
            return Promise.reject(e);
        }
    }

    length(callback?: (err: any, numberOfKeys: number) => void): Promise<number> {
        try {
            callback && callback(null, this._kv.size);
            return Promise.resolve(this._kv.size);
        } catch (e) {
            callback && callback(e, null);
            return Promise.reject(e);
        }
    }

    key(keyIndex: number, callback?: (err: any, key: string) => void): Promise<string> {
        if (keyIndex < 0 || this._kv.size <= keyIndex) {
            callback && callback(new Error("the keyIndex is out of range"), undefined);
            return Promise.reject(new Error("the keyIndex is out of range"));
        }
        callback && callback(null, this._kv.keys()[keyIndex]);
        return Promise.resolve(this._kv.keys()[keyIndex]);
    }

    keys(callback?: (err: any, keys: string[]) => void): Promise<string[]> {
        callback && callback(null, Array.from(this._kv.keys()));
        return Promise.resolve(Array.from(this._kv.keys()));
    }

    iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U, callback?: (err: any, result: U) => void): Promise<U> {
        let len = this._kv.size;
        let result : U = null;
        try {
            for (let i = 0; i < len; i++) {
                result = iteratee(this._kv.values[i], this._kv.keys[i], i);
            }
            callback && callback(null, result);
            return Promise.resolve(result);
        } catch (e) {
            callback && callback(e, null);
            return Promise.reject(e);
        }
    }

}

export default class Receptacle {
    private static instance ?: Receptacle;
    private appId: string;
    private forage : IStore;
    private shiftKeys: string[] = [];

    private constructor (appId: string, forage ?: IStore) {
        this.appId = appId;
        this.forage = forage || new DefaultStore();
    }

    public static getInstance (appId ?: string, forage ?: IStore) : Receptacle {
        if (!Receptacle.instance && !appId) {
            throw new Error("Receptacle instance is not created, please specify the appId when construct the MonitorLauncher");
        }
        if (!Receptacle.instance) {
            Receptacle.instance = new Receptacle(appId, forage);
        }
        return Receptacle.instance;
    }

    async cleanShift() {
        while (this.shiftKeys.length > 0) {
            await this.forage.removeItem(this.shiftKeys.pop());  
        }
        this.shiftKeys = [];
    }

    async shift (size: number, immediate: boolean = true) {
        let items : Array<any> = [];
        let keys = await this.keys();
        while (size && keys.length > 0) {
            let key = keys.shift() || "";
            items.push(await this.forage.getItem(key));
            this.shiftKeys.push(key);
            size--;
        }
        if (immediate) {
            await this.cleanShift();
        }
        return items;
    }

    @around(true, "beforeCollect", "afterCollect")
    async push<T> (item: T) {
        let key = `${this.appId}_${randomString()}`;
        await this.forage.setItem(key, item);
        return key;
    }

    async length () {
        return await this.forage.length();
    }

    async clear () {
        return await this.forage.clear();
    }

    async keys () {
        return await this.forage.keys();
    }

    async iterate<T, U> (iteratee: (value: T, key: string, iterationNumber: number) => U) {
        return await this.forage.iterate(iteratee);
    }
}