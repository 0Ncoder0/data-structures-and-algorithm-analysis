/** 保存当前顶点的临近顶点下标 */
type Vertex = number[]
/** 下标为当前顶点 */
type Graph = Vertex[]

/** 基础示例 */
const getGraph = () => [[1, 2, 3], [3, 4], [5], [2, 5, 6], [3, 6], [], [5]]

/**
 * 1. 找到一个没有入边的顶点
 * 2. 记录顶点值，移除这个顶点
 * 3. 若顶点已空则返回当前路径
 * 4. 所有顶点均有入边则抛出异常
 */
const simpleTopSort = (graph: Graph) => {
  const path: number[] = []
  const used: boolean[] = []

  for (let i = 0; i < graph.length; i++) {
    const available = graph.findIndex((v, index) => {
      if (used[index]) return
      return graph.every(vertex => !vertex.includes(index))
    })

    if (available === -1) throw 'Graph has a circle'
    used[available] = true

    path.push(available)
    graph[available] = []
  }

  return path
}

/**
 * 1. 计算所有顶点的入边数
 * 2. 记录入边数为零的顶点到队列,
 * 3. 若队列内有值, 则推出一位顶点，放入路径中，并减少临近顶点的入边数
 * 4. 若产生新的入边数为零的顶点, 则推入队列中
 * 4. 循环直到队列为空, 返回路径
 * 5. 若路径顶点数与图的顶点数不一致则抛出异常
 */
const topSort = (graph: Graph) => {
  const list: number[] = new Array(graph.length).fill(0)
  graph.forEach(ver => ver.forEach(v => list[v]++))

  const emptys: number[] = []
  list.forEach((count, index) => !count && emptys.push(index))

  const path: number[] = []

  while (emptys.length) {
    const index = emptys.shift()
    graph[index].forEach(idx => --list[idx] === 0 && emptys.push(idx))
    path.push(index)
  }

  if (path.length !== graph.length) throw 'Graph has a circle'

  return path
}

{
  // 性能测试

  /** 生成一个简单的图  0->1->2....n->n+1  */
  const getTopGraph = (length: number): Graph => {
    const graph: Graph = []
    for (let i = 1; i <= length; i++) {
      graph.push(i === length ? [] : [i])
    }
    return graph
  }

  const len = 1000

  console.time('simpleTopSort')
  console.log(simpleTopSort(getGraph()))
  simpleTopSort(getTopGraph(len))
  console.timeEnd('simpleTopSort')

  console.time('topSort')
  console.log(topSort(getGraph()))
  topSort(getTopGraph(len))
  console.timeEnd('topSort')
}
