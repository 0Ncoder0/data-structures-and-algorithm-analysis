/** 节点 */
class Node<T> {
  /** 元素 */
  public element: T | null = null
  /** 节点距离叶节点的高度，叶节点的高度为 0 */
  public height: number = 0
  /** 懒删除 */
  public deleted: boolean = false
  /** 左子节点 */
  public left: Node<T> | null = null
  /** 右子节点 */
  public right: Node<T> | null = null
}

/** 平衡二叉树 */
export class AVLTree<T> {
  /** 根节点 */
  public root: Node<T> = null

  /** 类内部使用的插入函数 */
  private innerInsert(element: T, node: Node<T>) {
    if (node === null) {
      const newNode = new Node<T>()
      newNode.element = element
      node = newNode
    } else if (element > node.element) {
      node.right = this.innerInsert(element, node.right)
      if (node.right.height - (node.left?.height || 0) === 2) {
        if (element > node.right.element) {
          node = this.singleRotateRight(node)
        } else {
          node = this.doubleRotateRight(node)
        }
      }
      this.updateHeight(node)
    } else if (element < node.element) {
      node.left = this.innerInsert(element, node.left)
      if (node.left.height - (node.right?.height || 0) === 2) {
        if (element > node.left.element) {
          node = this.doubleRotateLeft(node)
        } else {
          node = this.singleRotateLeft(node)
        }
      }
      this.updateHeight(node)
    } else if (element === node.element) {
      node.deleted = false
    }
    return node
  }

  /** 插入元素 */
  public insert(element: T): void {
    this.root = this.innerInsert(element, this.root)
  }

  /** 查找元素所在节点 */
  public find(element: T): Node<T> | null {
    let node = this.root
    for (;;) {
      if (node === null) {
        break
      } else if (node.element === element) {
        if (node.deleted) node = null
        break
      } else if (element > node.element) {
        node = node.right
      } else {
        node = node.left
      }
    }
    return node
  }

  /**
   * 删除元素
   * @todo 以非懒删除的形式删除节点
   */
  public delete(element: T): void {
    const node = this.find(element)
    if (node) node.deleted = true
  }

  private updateHeight(node: Node<T>): void {
    node.height = Math.max(node.left?.height || 0, node.right?.height || 0) + 1
  }

  /** 使用左子节点替换当前节点 */
  private singleRotateLeft(node: Node<T>): Node<T> {
    if (node.left === null) return node
    const root = node.left
    node.left = root.right
    root.right = node

    this.updateHeight(node)
    this.updateHeight(root)

    return root
  }

  /** 使用右子节点替换当前节点 */
  private singleRotateRight(node: Node<T>): Node<T> {
    if (node.right === null) return node

    const root = node.right
    node.right = root.left
    root.left = node

    this.updateHeight(node)
    this.updateHeight(root)

    return root
  }

  /** 使用左子节点的右子节点替换当前节点 */
  private doubleRotateLeft(node: Node<T>): Node<T> {
    node.left = this.singleRotateRight(node.left)
    return this.singleRotateLeft(node)
  }

  /** 使用右子节点的左子节点替换当前节点 */
  private doubleRotateRight(node: Node<T>): Node<T> {
    node.right = this.singleRotateLeft(node.right)
    return this.singleRotateRight(node)
  }
}
