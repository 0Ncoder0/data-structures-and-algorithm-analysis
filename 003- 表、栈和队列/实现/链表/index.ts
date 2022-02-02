/** 结点 */
class Node<T> {
  /** 当前结点的元素 */
  public element: T | null = null
  /** 下一个结点 */
  public next: Node<T> | null = null
  /** 上一个结点 */
  public previous: Node<T> | null = null
}

/** 链表 */
export class List<T> {
  /** 头结点，不保存元素 */
  public head: Node<T> = new Node<T>()

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
    const node = this.find(element)
    if (node === null) return
    node.previous.next = node.next
    node.next.previous = node.previous
  }
  /** 插入一个元素，到给定结点的后面 */
  public insert(element: T, node: Node<T>): void {
    const newNode = new Node<T>()
    newNode.element = element
    newNode.next = node.next
    newNode.previous = node
    newNode.next.previous = newNode
    newNode.previous.next = newNode
  }
}
