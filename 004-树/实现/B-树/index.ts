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

  /** 是否超出容量 */
  public static isOversized<T>(node: Node<T>): boolean {
    if (node.children.length === 0) {
      return node.elements.length > node.size
    } else {
      return node.children.length > node.size
    }
  }

  /** 分裂子节点，并插入到父节点中 */
  public static split<T>(node: Node<T>, insertTo: number, parent: Node<T>) {
    const brother = new Node<T>()
    brother.parent = parent
    brother.size = node.size

    const half = (node.size + 1) / 2

    if (node.children.length === 0) {
      for (let i = 0; i < half; i++) {
        brother.elements.unshift(node.elements.pop())
      }
      parent.elements.splice(insertTo, 0, brother.elements[0])

    } else {
      for (let i = 0; i < half; i++) {
        brother.children.unshift(node.children.pop())
      }
      for (let i = 0; i < half - 1; i++) {
        brother.elements.unshift(node.elements.pop())
      }
      parent.elements.splice(insertTo, 0, node.elements.pop())
    }

    parent.children.splice(insertTo + 1, 0, brother)
  }

  /** 插入元素 */
  public static insert<T>(element: T, node: Node<T>): Node<T> | null {
    let insertTo = -1
    for (insertTo = 0; insertTo < node.elements.length; insertTo++) {
      if (element < node.elements[insertTo]) break
    }

    if (node.elements.includes(element)) {
    } else if (node.children.length === 0) {
      node.elements.splice(insertTo, 0, element)
    } else {
      const child = node.children[insertTo]
      Operator.insert(element, child)
      if (Operator.isOversized(child)) {
        Operator.split(child, insertTo, node)
      }
    }

    if (node.parent === null && Operator.isOversized(node)) {
      const parent = new Node<T>()
      parent.children.push(node)
      parent.size = node.size
      node.parent = parent
      Operator.split(node, 0, parent)
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
  public elementRange = 10
  public testCaseCount = 10
  public allowPrint = false

  public go() {
    this.randomInserts()
    this.print()
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


new Checker().go()