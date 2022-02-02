/** 结点 */
class Node<T> {
  /** 当前结点的元素 */
  public element: T | null = null
  /** 下一个结点 */
  public next: Node<T> | null = null
}

/** 栈 */
export class Stack<T> {
  /** 头结点，不保存元素 */
  public head: Node<T> = new Node<T>()

  /** 清空栈 */
  public makeEmpty(): void {
    this.head.next = null
  }
  /** 检查栈是否为空 */
  public isEmpty(): boolean {
    return this.head.next === null
  }
  /** 入栈 */
  public push(element: T): void {
    const newNode = new Node<T>()
    newNode.element = element
    newNode.next = this.head.next
    this.head.next = newNode
  }
  /** 出栈，若栈已空则返回 null */
  public pop(): T | null {
    if (this.head.next === null) return null
    const element = this.head.next.element
    this.head.next = this.head.next.next
    return element
  }
}
