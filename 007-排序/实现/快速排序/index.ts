/**
 * 快速排序
 * - 选择一个元素作为中值
 * - 以中值为基准拆分为大于中值和小于中值的两份数组
 * - 递归排序两份数组
 */
export const QuickSort = (list: number[]) => {
  return sort(list, 0, list.length - 1)
}

const sort = (list: number[], start: number, end: number) => {
  if (end - start < 1) return list

  const middle = Math.floor((end + start) / 2)

  let i = start
  let j = end - 1
  let flag = true

  swap(list, middle, end)
  for (; i < j; ) {
    if (flag) {
      if (list[i] <= list[end]) i++
      else swap(list, i, j--), (flag = false)
    } else {
      if (list[j] >= list[end]) j--
      else swap(list, i++, j), (flag = true)
    }
  }

  if (list[i] < list[end]) i++
  swap(list, i, end)

  sort(list, start, i - 1)
  sort(list, i + 1, end)

  return list
}

/** 交换下标所在的值 */
const swap = (list: number[], indexA: number, indexB: number) => {
  const temp = list[indexA]
  list[indexA] = list[indexB]
  list[indexB] = temp
}
