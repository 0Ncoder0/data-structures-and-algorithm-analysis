/**
 * @todo 未完成
 */

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

  /** 当前节点是否为叶节点 */
  public static isLeaf<T>(node: Node<T>): boolean {
    return node.children.length === 0
  }
  /** 元素是否过多 */
  public static isOversized<T>(node: Node<T>): boolean {
    if (Operator.isLeaf(node)) {
      return node.elements.length > node.size
    } else {
      return node.elements.length > (node.size - 1)
    }
  }

  /** 元素是否过少 */
  public static isTooSmall<T>(node: Node<T>): boolean {
    const minimal = Math.ceil(node.size / 2)
    if (Operator.isLeaf(node)) {
      return node.elements.length < minimal
    } else {
      return node.elements.length < (minimal - 1)
    }
  }

  /** 分裂子节点，并插入到父节点中 */
  public static split<T>(node: Node<T>, parent: Node<T>) {
    const index = parent.children.findIndex(ele => ele === node)
    const half = Math.ceil(node.elements.length / 2)
    const brother = new Node<T>()
    brother.parent = parent
    brother.size = node.size


    if (node.children.length === 0) {
      for (let i = 0; i < half; i++) {
        brother.elements.unshift(node.elements.pop())
      }
      parent.elements.splice(index, 0, brother.elements[0])

    } else {
      for (let i = 0; i < half; i++) {
        const child = node.children.pop()
        child.parent = brother
        brother.children.unshift(child)
      }
      for (let i = 0; i < half - 1; i++) {
        brother.elements.unshift(node.elements.pop())
      }
      parent.elements.splice(index, 0, node.elements.pop())
    }
    parent.children.splice(index + 1, 0, brother)
  }

  /** 合并子节点到兄弟节点 */
  public static merge<T>(node: Node<T>, parent: Node<T>): void {
    const index = parent.children.findIndex(ele => ele === node)
    let fromNode: Node<T> = null
    let toNode: Node<T> = null
    if (index === 0) {
      toNode = node
      fromNode = parent.children[index + 1]
      fromNode.parent = null
      parent.elements.shift()
      parent.children.splice(index + 1, 1)
    } else {
      toNode = parent.children[index - 1]
      fromNode = node
      fromNode.parent = null
      parent.elements.splice(index - 1, 1)
      parent.children.splice(index, 1)
    }

    const element = fromNode.children[0]?.elements[0]
    if (element !== undefined) toNode.elements.push(element)

    for (; ;) {
      const element = fromNode.elements.shift()
      if (element !== undefined) toNode.elements.push(element)
      else break
    }

    for (; ;) {
      const child = fromNode.children.shift()
      if (child !== undefined) toNode.children.push(child)
      else break
    }

    Operator.correct(toNode)


  }

  /** 
   * 检查并修正节点
   * 1. 若子节点过多则分裂
   * 2. 若子节点过少则合并
   * 3. 向上递归，直到树结构正确
   */
  public static correct<T>(node: Node<T>): void {
    if (node.parent === null) return

    if (this.isTooSmall(node)) {
      const parent = node.parent
      Operator.merge(node, parent)
      Operator.correct(parent)
    } else if (this.isOversized(node)) {
      const parent = node.parent
      Operator.split(node, parent)
      Operator.correct(parent)
    }
  }



  /** 插入元素 */
  public static insert<T>(element: T, node: Node<T>): Node<T> | null {
    if (node.elements.includes(element)) return node

    let insertTo = -1
    for (insertTo = 0; insertTo < node.elements.length; insertTo++) {
      if (element < node.elements[insertTo]) break
    }
    if (Operator.isLeaf(node)) {
      node.elements.splice(insertTo, 0, element)
    } else {
      const child = node.children[insertTo]
      Operator.insert(element, child)
      Operator.correct(child)
    }

    if (node.parent === null && Operator.isOversized(node)) {
      const parent = new Node<T>()
      parent.children.push(node)
      parent.size = node.size
      node.parent = parent
      Operator.split(node, parent)
      node = parent
    }

    return node
  }

  /** 删除元素 */
  public static delete<T>(element: T, node: Node<T>): Node<T> | null {
    if (Operator.isLeaf(node)) {
      const index = node.elements.findIndex(ele => ele === element)
      if (index !== -1) {
        node.elements.splice(index, 1)
        Operator.correct(node)
      }
      if (index === 0 && node.parent) {
        const replace = node.parent.elements.findIndex(ele => ele === element)
      }
    } else {
      let index = -1
      for (index = 0; index < node.elements.length; index++) {
        if (element < node.elements[index]) break
      }
      Operator.delete(element, node.children[index])
    }

    if (node.parent === null && node.children.length === 1) {
      node.children[0].parent = null
      node = node.children[0]
    }

    return node
  }

  /** 查找元素，返回元素所在的叶节点 */
  public static search<T>(element: T, node: Node<T>): Node<T> | null {
    if (node.children.length === 0) {
      if (node.elements.includes(element)) return node
      else return null
    } else {
      for (let i = 0; i < node.elements.length; i++) {
        if (element < node.elements[i]) {
          return Operator.search(element, node.children[i])
        }
      }
      return Operator.search(element, node.children[node.children.length - 1])
    }
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
  public tree = new BTree<number>(3)
  public store: number[] = []
  public elementRange = 100
  public testCaseCount = 20
  public allowPrint = true

  public go() {
    this.randomInserts()
    this.randomDeletes()
    this.checkStructure()
    this.checkElements()
    this.checkSearch()
    if (this.allowPrint) this.print()
  }

  public randomInserts() {
    new Array(this.testCaseCount).fill(null).forEach(() => {
      const element = Math.floor(Math.random() * this.elementRange)
      const isExist = this.store.includes(element)
      if (!isExist) this.store.push(element)
      this.tree.insert(element)
      this.check(element)
    })
  }

  public randomDeletes() {
    new Array(this.testCaseCount).fill(null).forEach(() => {
      if (Math.random() > 0.5) {
        const index = Math.floor(Math.random() * this.store.length)
        const element = this.store[index]
        this.store = this.store.filter(ele => ele !== element)
        this.tree.delete(element)
        this.check(element)
      } else {
        const element = Math.floor(Math.random() * this.elementRange)
        if (this.store.includes(element)) return
        this.tree.delete(element)
        this.check(element)
      }

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

  public checkStructure() {

    const fun = <T>(node: Node<T>) => {
      if (node.parent !== null && (Operator.isOversized(node) || Operator.isTooSmall(node))) {
        const numberOfElement = node.elements.length
        const numberOfChild = node.children.length
        console.log('----')
        console.log({ numberOfElement, numberOfChild })
        console.log(node)
        throw 'structure error'
      }
      node.children.forEach(ele => fun(ele))
    }
    fun(this.tree.root)
  }

  public check(element: number) {
    try {
      this.checkElements()
      this.checkStructure()
    } catch (err) {
      this.print()
      console.log(element)
      throw err
    }
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

{
  const checker = new Checker()
  const tree = new BTree<number>(3)
  checker.tree = tree

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  list.forEach(ele => tree.insert(ele))
  list.forEach(ele => tree.delete(ele))

  // checker.print()
  // console.log('-----')
  // tree.delete(8)
  // console.log(8)
  // console.log('-----')
  // checker.print()
}