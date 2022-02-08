/**
 * 归并排序
 * 将列表拆分成两份子列表，对子列表进行排序，然后合并子列表并返回
 */
export const MergeSort = (list: number[]) => {
  if (list.length <= 1) return list

  let listA = []
  let listB = []

  let index = 0
  let indexA = 0
  let indexB = 0

  const half = Math.floor(list.length / 2)
  // 拆分
  for (index = 0, indexA = 0; index < half; index++, indexA++) {
    listA[indexA] = list[index]
  }
  for (index = half, indexB = 0; index < list.length; index++, indexB++) {
    listB[indexB] = list[index]
  }

  // 递归
  listA = MergeSort(listA)
  listB = MergeSort(listB)

  // 合并
  for (index = 0, indexA = 0, indexB = 0; index < list.length; index++) {
    if (indexB === listB.length || listA[indexA] <= listB[indexB]) {
      list[index] = listA[indexA++]
    } else if (indexA === listA.length || listB[indexB] <= listA[indexA]) {
      list[index] = listB[indexB++]
    } else break
  }

  return list
}
