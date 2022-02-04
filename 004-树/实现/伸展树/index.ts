/** 节点 */
class Node<T> {
  /** 节点保存的元素 */
  public element: T = null
  /** 左子节点 */
  public left: Node<T> = null
  /** 右子节点 */
  public right: Node<T> = null
}

/** 伸展树 */
export default class SplayingTree<T> {
  /** 根节点 */
  public root: Node<T> = null

  /** 内部使用的插入函数 */
  private innerInsert(element: T, node: Node<T> | null): Node<T> {
    if (node === null) {
      node = new Node<T>()
      node.element = element
    } else if (element > node.element) {
      node.right = this.innerInsert(element, node.right)
    } else if (element < node.element) {
      node.left = this.innerInsert(element, node.left)
    }
    return node
  }
  /** 插入元素 */
  public insert(element: T): void {
    this.root = this.innerInsert(element, this.root)
  }

  /** 内部使用的删除函数 */
  private innerDelete(element: T, node: Node<T> | null): Node<T> {
    if (node === null) {
    } else if (element > node.element) {
      node.right = this.innerDelete(element, node.right)
    } else if (element < node.element) {
      node.left = this.innerDelete(element, node.left)
    } else if (element === node.element) {
      if (node.left === null) {
        if (node.right === null) {
          node = null
        } else {
          node = node.right
        }
      } else {
        node.element = node.left.element
        node.left.element = element
        node.left = this.innerDelete(element, node.left)
      }
    }
    return node
  }
  /** 删除元素 */
  public delete(element: T): void {
    this.root = this.innerDelete(element, this.root)
  }

  /** 将目标元素所在的位置拉向当前节点，若目标节点存在，最终将会被拉到当前位置，于是返回的就是目标节点 */
  private splay(element: T, node: Node<T>): Node<T> | null {
    if (node === null || element === node.element) return node

    if (element > node.element) {
      if (node.right) {
        if (element > node.right.element) {
          node.right.right = this.splay(element, node.right.right)
          if (node.right.right) {
            node = this.singleRotateRight(node)
          }
        }
        if (element < node.right.element) {
          node.right.left = this.splay(element, node.right.left)
          if (node.right.left) {
            node.right = this.singleRotateLeft(node.right)
          }
        }
        node = this.singleRotateRight(node)
      }
    }

    if (element < node.element) {
      if (node.left) {
        if (element < node.left.element) {
          node.left.left = this.splay(element, node.left.left)
          if (node.left.left) {
            node = this.singleRotateLeft(node)
          }
        }
        if (element > node.left.element) {
          node.left.right = this.splay(element, node.left.right)
          if (node.left.right) {
            node.left = this.singleRotateRight(node.left)
          }
        }
        node = this.singleRotateLeft(node)
      }
    }

    return node
  }

  /** 查找并返回元素所在节点，若无则返回 null */
  public search(element: T): Node<T> | null {
    this.root = this.splay(element, this.root)
    return this.root.element === element ? this.root : null
  }

  /** 使用左子节点替换当前节点 */
  private singleRotateLeft(node: Node<T>): Node<T> {
    if (node.left === null) return node

    const newNode = node.left
    node.left = node.left.right
    newNode.right = node

    return newNode
  }

  /** 使用右子节点替换当前节点 */
  private singleRotateRight(node: Node<T>): Node<T> {
    if (node.right === null) return node

    const newNode = node.right
    node.right = node.right.left
    newNode.left = node

    return newNode
  }
}
