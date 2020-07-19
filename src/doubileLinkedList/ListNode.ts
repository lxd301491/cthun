export default class ListNode<T> implements IListNode<T> {
    private _prev: IListNode<T>;
    private _next: IListNode<T>;
    private _val: T;

    get val (): T {
        return this._val;
    }

    set val (val: T) {
        this._val = val;
    }

    get prev (): IListNode<T> {
        return this._prev;
    }

    set prev (prev: IListNode<T>) {
        this._prev = prev;
    }

    get next (): IListNode<T> {
        return this._next;
    }

    set next (next: IListNode<T>) {
        this._next = next;
    }

    constructor (val: T) {
        this._val = val;
        this._prev = null;
        this._next = null;
    }

    hasPrev(): boolean {
        return !!this._prev;
    }

    hasNext(): boolean {
        return !!this._next;
    }
}