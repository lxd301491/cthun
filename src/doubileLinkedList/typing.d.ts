interface IListNode<T> {
    prev: IListNode<T>;
    next: IListNode<T>;
    val: T;
    hasPrev(): boolean;
    hasNext(): boolean;
}

interface IList<T> {
    add(a: T);//添加元素

    insert(node: T, a: T);//插入元素

    remove(a: T);//移除元素

    header(): IListNode<T>;//返回头元素

    tail(): IListNode<T>;//返回尾元素

    find(a: T): null | IListNode<T>;//查找元素

    reverse_find(a: T): null | IListNode<T>;//反向查找元素

    size(): number;//返回列表元素个数
    
    empty(): boolean;//是否空列表
    
    clear(): void;//清空列表
}