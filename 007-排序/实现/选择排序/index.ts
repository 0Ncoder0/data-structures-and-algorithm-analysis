/**
 * 选择排序
 * 选择未排序列表中最小的值，交换到已排序列表的后方
 */
export const SelectionSort = (list: number[]) => {
  for (let i = 0; i < list.length - 1; i++) {
    let minIndex = i
    for (let k = i; k < list.length; k++) {
      if (list[k] < list[minIndex]) {
        minIndex = k
      }
    }
    const temp = list[minIndex]
    list[minIndex] = list[i]
    list[i] = temp
  }

  return list
}
