/**
 * 插入排序
 * 选择未排序列表中的一个值，插入到已排序列表中合适的位置
 */
export const InsertionSort = (list: number[]) => {
  for (let i = 0; i < list.length; i++) {
    for (let k = 0; k <= i; k++) {
      if (list[i] < list[k]) {
        const temp = list[k]
        list[k] = list[i]
        list[i] = temp
      }
    }
  }
  return list
}
