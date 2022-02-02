/** 结点 */
class Node<T> {
  /** 当前结点的元素 */
  public element: T | null = null
  /** 下一个结点 */
  public next: Node<T> | null = null
}

/** 队列 */
export class Queue<T> {
  /** 头结点，不保存元素 */
  public head: Node<T> = new Node<T>()
  /** 最后一个结点 */
  public last: Node<T> = this.head

  /** 入队 */
  public enqueue(element: T): void {
    const newNode = new Node<T>()
    newNode.element = element
    this.last.next = newNode
    this.last = newNode
  }
  /** 出队，若队列已空则返回 null */
  public dequeue(): T | null {
    const first = this.head.next
    if (first === null) return null
    if (first === this.last) this.last = this.head
    const element = first.element
    this.head.next = first.next
    return element
  }
}
