/** 二叉堆 */
export class BinaryHeap {
  private store: number[] = [];

  /** 交换下标所在的值 */
  private swap(indexA: number, indexB: number) {
    const temp = this.store[indexA];
    this.store[indexA] = this.store[indexB];
    this.store[indexB] = temp;
  }

  /** 向下冒泡 */
  private heapDown(index: number) {
    // undefined < 0 : false
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;

    const nextIndex =
      this.store[rightIndex] < this.store[leftIndex] ? rightIndex : leftIndex;

    if (this.store[nextIndex] < this.store[index]) {
      this.swap(index, nextIndex);
      this.heapDown(nextIndex);
    }
  }

  /** 向上冒泡 */
  private heapUp(index: number) {
    if (index === 0) return;
    const value = this.store[index];
    const parentIndex = Math.floor((index - 1) / 2);
    const parentValue = this.store[parentIndex];
    if (value < parentValue) {
      this.swap(index, parentIndex);
      this.heapUp(parentIndex);
    }
  }

  /** 插入元素 */
  public insert(element: number): void {
    this.store.push(element);
    this.heapUp(this.store.length - 1);
  }

  /** 删除并返回最小值 */
  public deleteMin(): number | null {
    if (this.store.length === 0) return null;
    if (this.store.length === 1) return this.store.pop();
    const min = this.store[0];
    this.store[0] = this.store.pop();
    this.heapDown(0);
    return min;
  }
}
