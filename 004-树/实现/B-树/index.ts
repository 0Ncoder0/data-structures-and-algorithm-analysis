/** 节点 */
class Node<T> {
  /** 当前节点可容纳的元素数量 */
  public size = 0
  /** 父节点 */
  public parent: Node<T> | null = null
  /** 元素列表 */
  public elements: T[] = []
  /** 子节点列表 */
  public children: Node<T>[] = []
}

/** 保存操作 B-树 的方法 */
class Operator {
  public static updateElements<T>(node: Node<T>): void {
    node.elements = []
    node.children.forEach((child, index) => index && node.elements.push(child.elements[0]))
  }

  public static isOversized<T>(node: Node<T>): boolean {
    if (node.children.length === 0) {
      return node.elements.length > node.size
    } else {
      return node.children.length > node.size
    }
  }

  /** 创建兄弟节点承担半数元素，并返回两个节点 */
  public static split<T>(node: Node<T>): Node<T>[] {
    const brother = new Node<T>()
    brother.parent = node.parent
    brother.size = node.size

    if (node.children.length === 0) {
      for (let i = 0; i < (node.size + 1) / 2; i++) {
        brother.elements.push(node.elements.shift())
      }
    } else {
      for (let i = 0; i < (node.size + 1) / 2; i++) {
        brother.children.push(node.children.shift())
      }
      Operator.updateElements(brother)
      Operator.updateElements(node)
    }

    return [brother, node]
  }

  /** 插入元素 */
  public static insert<T>(element: T, node: Node<T>): Node<T> | null {
    if (node.elements.includes(element)) {
    } else if (node.children.length === 0) {
      node.elements.push(element)
      node.elements.sort((a, b) => (a > b ? 1 : -1))
    } else {
      let insertTo = -1

      for (let i = 0; i < node.elements.length; i++) {
        const thisElement = node.elements[i]
        const nextElement = node.elements[i + 1]
        if (i === 0) {
          if (element < thisElement) {
            insertTo = 0
          }
        }
        if (nextElement === undefined) {
          if (element > thisElement) {
            insertTo = i + 1
          }
        }
        if (element > thisElement && element < nextElement) {
          insertTo = i + 1
        }
      }

      const child = node.children[insertTo]

      Operator.insert(element, child)
      if (Operator.isOversized(child)) {
        node.children.splice(insertTo, 1, ...Operator.split(child))
        Operator.updateElements(node)
      }
    }

    if (node.parent === null && Operator.isOversized(node)) {
      const [first, second] = Operator.split(node)
      const parent = new Node<T>()
      parent.children = [first, second]
      parent.elements = [second.elements[0]]
      parent.size = first.size

      first.parent = parent
      second.parent = parent
      node = parent
    }

    return node
  }
  /** 删除元素 */
  public static delete<T>(element: T, node: Node<T>): Node<T> | null {
    return
  }
  /** 查找元素 */
  public static search<T>(element: T, node: Node<T>): Node<T> | null {
    return
  }
}

/** B-树 */
export class BTree<T> {
  /** 根节点 */
  public root: Node<T> = null

  /**
   * @param size 叶节点的容量，对应的此树的最大容量为 size 的阶乘
   */
  public constructor(size = 4) {
    this.root = new Node<T>()
    this.root.size = size
  }

  /** 插入元素 */
  public insert(element: T): void {
    this.root = Operator.insert(element, this.root)
  }
  /** 删除元素 */
  public delete(element: T): void {
    this.root = Operator.delete(element, this.root)
  }
  /** 查找元素 */
  public search(element: T): Node<T> | null {
    const node = Operator.search(element, this.root)
    return node
  }
}

class Checker {
  public tree = new BTree<number>(4)
  public store: number[] = []
  public elementRange = 1000
  public testCaseCount = 1000
  public allowPrint = false

  public go() {
    this.randomInserts()
  }

  public randomInserts() {
    new Array(this.testCaseCount).fill(null).forEach(() => {
      const element = Math.floor(Math.random() * this.elementRange)
      const isExist = this.store.includes(element)
      if (!isExist) this.store.push(element)
      this.tree.insert(element)
      if (this.allowPrint) console.log(element)
      this.checkElements()
    })
  }

  public randomDeletes() {
    new Array(this.testCaseCount).fill(null).forEach(() => {
      const index = Math.floor(Math.random() * this.store.length)
      const element = this.store[index]
      this.store[index] = this.store.pop()
      this.tree.delete(element)
    })
  }

  public checkSearch() {
    new Array(this.testCaseCount).fill(null).forEach(() => {
      if (Math.random() > 0.5) {
        const index = Math.floor(Math.random() * this.store.length)
        const element = this.store[index]
        const isInTree = !!this.tree.search(element)
        if (!isInTree) throw 'search error'
      } else {
        const element = Math.floor(Math.random() * this.elementRange)
        const isInStore = !!this.store.includes(element)
        const isInTree = !!this.tree.search(element)
        if (isInStore !== isInTree) throw 'search error'
      }
    })
  }

  public checkElements() {
    const ordered = [...this.store].sort((a, b) => a - b)
    const list = []
    const fun = (node: Node<number>) => {
      if (node.children.length) {
        node.children.forEach(ele => fun(ele))
      } else {
        node.elements.forEach(ele => list.push(ele))
      }
    }

    fun(this.tree.root)

    const checked = ordered.every((ele, index) => ele === list[index])
    if (!checked && this.allowPrint) console.log(list, ordered)
    if (!checked && this.allowPrint) this.print()
    if (!checked) throw 'elements not match'
  }

  public print(node?: Node<number>, depth = 0) {
    if (!node) node = this.tree.root
    const space = new Array(depth).fill(' ').join('')
    const elements = node.elements.join(',')
    console.log(space, elements)
    if (node.children) {
      node.children.forEach(ele => this.print(ele, depth + 1))
    }
  }
}

const checker = new Checker()
checker.tree = new BTree(3)
checker.elementRange = 100
checker.testCaseCount = 10
checker.allowPrint = true
checker.go()

/**
 * 87
 *   34
 *     23,27
 *     34,52
 *   87
 *     59,64
 *     87,92
 */
