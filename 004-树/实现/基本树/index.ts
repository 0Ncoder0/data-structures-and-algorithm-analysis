import { List } from '../../../003- 表、栈和队列/实现/链表'
import { Queue } from '../../../003- 表、栈和队列/实现/队列'
/** 结点 */
class Node<T> {
  /** 结点元素 */
  public element: T | null = null
  /** 父节点 */
  public parent: Node<T> | null = null
  /** 子结点 */
  public children: List<Node<T>> = new List()
}

export class Tree<T> {
  /** 不保存元素的头结点 */
  public head = new Node<T>()

  /** 返回给定元素所在的结点，若无则返回空 */
  public find(element: T): Node<T> | null {
    const queue = new Queue<Node<T>>()
    queue.enqueue(this.head)

    let node: Node<T> = null
    for (;;) {
      node = queue.dequeue()
      if (node !== null && node.element !== element) {
        let child = node.children.head
        for (;;) {
          child = node.children.advance(child)
          if (child !== null && child.element !== null) queue.enqueue(child.element)
          else break
        }
      } else break
    }

    return node
  }
  /** 作为子结点插入到给定结点下 */
  public insert(element: T, node: Node<T>): void {
    const newNode = new Node<T>()
    newNode.element = element
    newNode.parent = node
    node.children.insert(newNode, node.children.head)
  }
  /** 删除结点，若该结点存在子结点则一并删除  */
  public delete(element: T): void {
    const node = this.find(element)
    if (node === null) return
    node.parent.children.delete(node)
  }
}
