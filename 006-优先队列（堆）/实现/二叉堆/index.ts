/** 二叉堆 */
export class BinaryHeap {
  private store: number[] = [0];

  /** 插入元素 */
  public insert(element: number): void {
    let index = this.store.length;
    for (;;) {
      let parentIndex = Math.floor(index / 2);

      if (element < this.store[parentIndex]) {
        this.store[index] = this.store[parentIndex];
        index = parentIndex;
      } else {
        this.store[index] = element;
        break;
      }
    }
  }

  /** 删除并返回最小值 */
  public deleteMin(): number | null {
    if (this.store.length === 1) return null;
    let last = this.store[this.store.length - 1];
    let first = this.store[1];
    let index = 1;
    for (;;) {
      const leftIndex = index * 2;
      const rightIndex = leftIndex + 1;
      const leftElement = this.store[leftIndex];
      const rightElement = this.store[rightIndex];

      if (leftElement === undefined) {
        this.store[index] = last;
        this.store.pop();
        break;
      } else if (rightElement === undefined || leftElement < rightElement) {
        this.store[index] = leftElement;
        index = leftIndex;
      } else {
        this.store[index] = rightElement;
        index = rightIndex;
      }
    }
    return first;
  }
}
