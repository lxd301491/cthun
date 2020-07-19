import ListNode from './ListNode';

export class DoubileLinkedList<T> implements IList<T> {
    private _count: number = 0;//记录元素个数
    private _header: ListNode<T>;//头元素
    private _tail: ListNode<T>;//尾元素

    constructor () {
        this._header = new ListNode<T>(null);
        this._tail = new ListNode<T>(null);
        this._header.next = this._tail;
        this._tail.prev = this._header;
    }

    private _remove(prev: IListNode<T>, next: IListNode<T>, val: T) {
        let node = new ListNode<T>(val);
        prev.next = node.next;
        next.prev = node.prev;
        this._count--;
        return val;
    }

    private _add(prev: IListNode<T>, next: IListNode<T>, val: T) {
        let node = new ListNode<T>(val);
        prev.next = node;
        node.prev = prev;

        next.prev = node;
        node.next = next;
        this._count++;    
    }
    
    // 尾部插入一个元素
    add(a: T) {
        this._add(this._tail.prev, this._tail, a);
    }

    // 中间插入一个元素
    insert(node: T, a: T) {
        if (this.empty()) {
            return;
        }
        let prevNode = this._header.next;
        while(prevNode != this._tail) {
            if (prevNode.val == node) {
                this._add(prevNode, prevNode.next, a);
                break;
            }
            prevNode = prevNode.next;
        }
    }

    // 删除指定元素
    remove(a: T) {
        if (this.empty()) {
            return;
        }
        let targetNode = this._header.next;
        while(targetNode !== this._tail) {
            if (targetNode.val == a) {
                let value = this._remove(targetNode.prev, targetNode.next, targetNode.val);
                targetNode.next = null;
                targetNode.prev = null;
                return value;
            }
            targetNode = targetNode.next;
        }
    }
    
    header(): IListNode<T> {
        return this._header.next;
    }

    tail(): IListNode<T> {
        return this._tail;
    }

    find (a: T): IListNode<T> {
       if (this.empty()) {
            return;
        }
        let targetNode = this._header.next;
        while(targetNode !== this._tail) {
            if (targetNode.val == a) {
                return targetNode;
            }
            targetNode = targetNode.next;
        }
        return null;
    }

    reverse_find(a: T): null | IListNode<T> {
        if (this.empty()) {
            return;
        }
        let targetNode = this._tail.prev;
        while(targetNode !== this._tail) {
            if (targetNode.val == a) {
                return targetNode;
            }
            targetNode = targetNode.prev;
        }
        return null;
    }

    size(): number {
        return this._count;
    }

    empty(): boolean {
        return this._count === 0;
    }

    clear(): void {
        let node = this._header.next;
        while(node !== this._tail) {
            node.prev = null;
            node.val = null;
            node = node.next;
            node.prev.next = null;
        }
        this._header.next = this._tail;
        this._tail.prev = this._header;
        this._count = 0;
    }
}