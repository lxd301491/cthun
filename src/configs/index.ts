/**
* 拦截器
*/
export const handlers: IHandlers = {
   beforeCollect: undefined,
   afterCollect:undefined,
   beforeConsume: undefined,
   afterConsume: undefined
}

export default {
    env: 'production',
    /**
     * cookie过期时间
     */
    expiredays: 24 * 60 * 60 * 1000,
    /**
     * 超长消息压缩阈值
     */
    infoLenMax: 1000
}
