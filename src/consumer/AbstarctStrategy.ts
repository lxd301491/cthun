import { CircuitBreaker, CircuitBreakerOptions } from "../circuitBreaker";

export interface StrategyOptions {
    breakerOptions: CircuitBreakerOptions;
}

export default abstract class AbstarctStrategy {
    protected abnormalBreaker: CircuitBreaker;
    
    constructor (options: StrategyOptions = {
        breakerOptions: {
            thresholdForOpen: '5/60',
            idleTimeForOpen: 5 * 60,
            thresholdForHalfOpen: '1/60'
        }
    }) {
        this.abnormalBreaker = new CircuitBreaker(options.breakerOptions);
    }

    abstract consume(params: IConsumeParams): Promise<boolean>;

    public canPass () {
        return this.abnormalBreaker.canPass();
    }

    public count () {
        return this.abnormalBreaker.count();
    }
}