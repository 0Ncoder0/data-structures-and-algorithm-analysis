/** 结点 */
class Node<T> {
  /** 当前结点的元素 */
  public element: T | null = null
  /** 父节点 */
  public parent: Node<T> = null
  /** 左子节点 */
  public left: Node<T> = null
  /** 右子节点 */
  public right: Node<T> = null
}

/** 二叉查找树 */
export class BinarySearchTree<T> {
  /** 根节点 */
  public root: Node<T> = null

  /** 插入一个元素 */
  public insert(element: T): void {
    const newNode = new Node<T>()
    newNode.element = element
    if (this.root === null) this.root = newNode
    else {
      let node = this.root
      for (;;) {
        if (node.element >= element) {
          if (node.left === null) {
            node.left = newNode
            newNode.parent = node
            break
          } else node = node.left
        } else {
          if (node.right === null) {
            node.right = newNode
            newNode.parent = node
            break
          } else node = node.right
        }
      }
    }
  }
  /** 删除一个元素 */
  public delete(element: T): void {
    let node = this.find(element)

    // # 将需要删除的结点推到叶子处，然后删除
    // 尝试使用左右元素替换当前结点的元素，然后删除该节点
    // 若左右元素都为空则从父节点处删除当前结点
    // 若父元素为空则表示当前结点为根节点，表示无任何子结点，则置根节点为空
    for (;;) {
      if (node.left !== null) {
        node.element = node.left.element
        node = node.left
      } else if (node.right !== null) {
        node.element = node.right.element
        node = node.right
      } else if (node.parent === null) {
        this.root = null
        break
      } else if (node.parent.left === node) {
        node.parent.left = null
        break
      } else if (node.parent.right === node) {
        node.parent.right = null
        break
      }
    }
  }
  /** 查找一个元素所在的结点，若无则返回 null */
  public find(element: T): Node<T> | null {
    let node = this.root

    for (;;) {
      if (node !== null && node.element !== element) {
        if (node.element > element) {
          node = node.right
        } else {
          node = node.left
        }
      } else break
    }

    return node
  }
}
