/** 结点 */
class Node<T> {
  /** 当前结点的元素 */
  public element: T | null = null
  /** 下一个结点 */
  public next: Node<T> | null = null
}

/** 链表 */
export class List<T> {
  /** 头结点，不保存元素 */
  public head: Node<T> = new Node<T>()

  /** 清空链表 */
  public makeEmpty(): void {
    this.head.next = null
  }
  /** 检查链表是否为空 */
  public isEmpty(): boolean {
    return this.head.next === null
  }
  /** 检查给定结点是否为最后一个 */
  public isLast(node: Node<T>): boolean {
    return node.next === null
  }
  /** 查找并返回给定元素所在的结点，若无则返回 null */
  public find(element: T): Node<T> | null {
    let node = this.head.next
    while (node !== null && node.element !== element) {
      node = node.next
    }
    return node
  }
  /** 删除一个元素 */
  public delete(element: T): void {
    const previous = this.findPrevious(element)
    if (previous !== null) {
      previous.next = previous.next.next
    }
  }
  /** 查找并返回给定元素所在结点的前一个结点，若无则返回 null */
  public findPrevious(element: T): Node<T> | null {
    let node = this.head
    while (node.next !== null && node.next.element !== element) {
      node = node.next
    }
    if (this.isLast(node)) return null
    else return node
  }
  /** 插入一个元素，到给定结点的后面 */
  public insert(element: T, node: Node<T>): void {
    const newNode = new Node<T>()
    newNode.element = element
    newNode.next = node.next
    node.next = newNode
  }

  /** 返回给定结点的下一个结点 */
  public advance(node: Node<T>): Node<T> | null {
    return node.next
  }
}
