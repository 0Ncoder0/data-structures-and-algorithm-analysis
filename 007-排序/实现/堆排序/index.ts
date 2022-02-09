/**
 * 堆排序
 * - 在原数组上 build 堆
 * - delete_min 直到排空堆
 * - 得到排序数组
 */
export const HeapSort = (list: number[]) => {
  const ordered: number[] = []
  // 构建堆
  for (let index = 0; index < list.length; index++) heapUp(list, index)
  // 排空堆
  for (; list.length; ) ordered.push(deleteMin(list))
  return ordered
}

/** 删除并返回最小值 */
const deleteMin = (heap: number[]): number | null => {
  if (heap.length === 0) return null
  if (heap.length === 1) return heap.pop()
  const min = heap[0]
  heap[0] = heap.pop()
  heapDown(heap, 0)
  return min
}

/** 交换下标所在的值 */
const swap = (heap: number[], indexA: number, indexB: number) => {
  const temp = heap[indexA]
  heap[indexA] = heap[indexB]
  heap[indexB] = temp
}

/** 向下冒泡 */
const heapDown = (heap: number[], index: number) => {
  // undefined < 0 : false
  const leftIndex = index * 2 + 1
  const rightIndex = index * 2 + 2

  const nextIndex = heap[rightIndex] < heap[leftIndex] ? rightIndex : leftIndex

  if (heap[nextIndex] < heap[index]) {
    swap(heap, index, nextIndex)
    heapDown(heap, nextIndex)
  }
}

/** 向上冒泡 */
const heapUp = (heap: number[], index: number) => {
  if (index === 0) return
  const value = heap[index]
  const parentIndex = Math.floor((index - 1) / 2)
  const parentValue = heap[parentIndex]
  if (value < parentValue) {
    swap(heap, index, parentIndex)
    heapUp(heap, parentIndex)
  }
}
