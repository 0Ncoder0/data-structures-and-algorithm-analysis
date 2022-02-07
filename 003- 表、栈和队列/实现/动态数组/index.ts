/** 数组 O(1) 查询、增加删除两端的元素 */
export class FastArray<T = unknown> {
  private front = []
  private back = []

  public len(): number {
    return this.front.length + this.back.length
  }

  /** 查询下标所在的元素 */
  public getAt(index: number): T | undefined {
    // 0  0  | 0 | back[0]
    // 5  5  | 5 | back[0]
    // 5  5  | 4 | front[0]
    // 5  5  | 6 |  back[1]
    index -= this.front.length
    return index < 0 ? this.front[-index - 1] : this.back[index]
  }

  /** 更新下标所在的元素 */
  public setAt(index: number, element: T): void {
    index -= this.front.length
    index < 0 ? (this.front[-index - 1] = element) : (this.back[index] = element)
  }

  /** 删除并返回第一个元素 */
  public shift(): T | undefined {
    if (this.front.length === 0) {
      this.moveHalfFront()
    }
    return this.front.pop()
  }

  /** 插入元素到首位 */
  public unshift(element: T): void {
    this.front.push(element)
  }

  /** 删除并返回最后一个元素 */
  public pop(): T | undefined {
    if (this.back.length === 0) {
      this.moveHalfBack()
    }
    return this.back.pop()
  }

  /** 插入元素到末尾 */
  public push(element: T): void {
    this.back.push(element)
  }

  /** 将前部元素移动半数元素到后部 */
  private moveHalfBack() {
    const half = Math.ceil(this.len() / 2)
    this.back = this.front.splice(0, half).reverse()
  }
  /** 将后部元素移动半数元素到前部 */
  private moveHalfFront() {
    const half = Math.ceil(this.len() / 2)
    this.front = this.back.splice(0, half).reverse()
  }
}

;(function () {
  // 随机测试

  /** min <= result < max */
  const random = (max: number, min: number) => min + Math.floor(Math.random() * (max - min))
  enum Operation {
    len = 0,
    getAt = 1,
    setAt = 2,
    shift = 3,
    unshift = 4,
    pop = 5,
    push = 6
  }
  const arr = new Array()
  const fArr = new FastArray()
  for (let i = 0; i < 10000; i++) {
    switch (random(0, Object.keys(Operation).length)) {
      case Operation.len: {
        if (fArr.len() !== arr.length) throw 'len'
      }
      case Operation.getAt: {
        const index = random(0, arr.length)
        if (fArr.getAt(index) !== arr[index]) throw 'getAt'
      }
      case Operation.setAt: {
        const index = random(0, arr.length)
        const element = random(0, 10000)
        arr[index] = element
        fArr.setAt(index, element)
        if (fArr.getAt(index) !== arr[index]) throw 'setAt'
      }
      case Operation.shift: {
        if (fArr.shift() !== arr.shift()) throw 'shift'
      }
      case Operation.unshift: {
        const element = random(0, 10000)
        fArr.unshift(element)
        arr.unshift(element)
        if (fArr.getAt(0) !== arr[0]) throw 'unshift'
      }
      case Operation.pop: {
        if (fArr.pop() !== arr.pop()) throw 'pop'
      }
      case Operation.push: {
        const element = random(0, 10000)
        fArr.push(element)
        arr.push(element)
        if (fArr.getAt(fArr.len() - 1) !== arr[arr.length - 1]) throw 'push'
      }
    }
  }
  if (arr.some((ele, index) => fArr.getAt(index) !== ele)) throw 'not match'
})()
