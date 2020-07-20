/**
 * 存储器
 * 用于存放所有埋点数据
 * appId 针对app的唯一标识，必须
 * maxSize 最大存放种类，必须
 * maxWidth 最大并发数量
 * localization 本地化对象，必须实现getItem和setItem方法
 */
import localForage from 'localforage';

export default class Receptacle {
    private static instance ?: Receptacle;
    private forage: LocalForageDbMethodsCore & LocalForageDriverMethodsOptional;
    private shiftKeys: string[] = [];

    private constructor (appId: string) {
        this.forage = localForage.createInstance({
            name: appId,
            storeName: appId
        });
    }

    public static getInstance (appId ?: string) : Receptacle {
        if (!Receptacle.instance && !appId) {
            throw new Error("appid must be passed the first time to obtain the instance object!");
        }
        if (!Receptacle.instance) {
            Receptacle.instance = new Receptacle(appId);
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

    async push<T> (item: T) {
        let key = new Date().getTime() + "";
        await this.forage.setItem(key, item);
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