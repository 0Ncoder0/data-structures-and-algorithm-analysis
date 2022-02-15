/**
 * 拓扑排序
 */
export class Vertex<T> {
  /** 元素 */
  public element: T = null
  /** 相邻顶点 */
  public adjacents: Vertex<T>[] = []
}

/**
 * 拓扑排序
 * - 说明：对一个有向无环图(Directed Acyclic Graph简称DAG)G进行拓扑排序，是将G中所有顶点排成一个线性序列，使得图中任意一对顶点u和v，若边<u,v>∈E(G)，则u在线性序列中出现在v之前。通常，这样的线性序列称为满足拓扑次序(Topological Order)的序列，简称拓扑序列。简单的说，由某个集合上的一个偏序得到该集合上的一个全序，这个操作称之为拓扑排序。
 * 1. 记录顶点的入边数
 * 2. 将入边数为零的顶点加入队列
 * 3. 依次从队列中弹出一个顶点，添加到拓扑序列中
 * 4. 使弹出的顶点的临近顶点的入边数减一
 * 5. 若临近顶点的入边数为零，则加入队列
 * 6. 当队列为空时，若拓扑序列的长度等于顶点数，则返回序列，否则返回 null 表示该图不存在拓扑序列
 */
export const TopSort = <T>(vertexes: Vertex<T>[]): Vertex<T>[] => {
  /** 顶点 => 未访问过的入边数 */
  const vertex2inputs = new Map<Vertex<T>, number>()
  /** 入边为零的顶点列表 */
  const zeroInputsVertexes: Vertex<T>[] = []
  /** 拓扑序列 */
  const topSequence: Vertex<T>[] = []

  // 记录顶点的入边数
  vertexes.forEach(vertex => vertex2inputs.set(vertex, 0))
  vertexes.forEach(inputVertex => {
    inputVertex.adjacents.forEach(vertex => {
      const inputCount = vertex2inputs.get(vertex)
      vertex2inputs.set(vertex, inputCount + 1)
    })
  })

  // 将入边数为零的顶点加入队列
  vertexes.forEach(vertex => {
    const inputCount = vertex2inputs.get(vertex)
    if (inputCount === 0) zeroInputsVertexes.push(vertex)
  })

  // 清空队列
  for (; zeroInputsVertexes.length; ) {
    // 依次从队列中弹出一个顶点
    const inputVertex = zeroInputsVertexes.shift()
    // 添加到拓扑序列中
    topSequence.push(inputVertex)
    // 使弹出的顶点的临近顶点的入边数减一
    inputVertex.adjacents.forEach(vertex => {
      const inputCount = vertex2inputs.get(vertex) - 1
      // 若临近顶点的入边数为零，则加入队列
      if (inputCount === 0) zeroInputsVertexes.push(vertex)
      vertex2inputs.set(vertex, inputCount)
    })
  }

  // 当队列为空时，若拓扑序列的长度等于顶点数，则返回序列，否则返回 null 表示该图不存在拓扑序列
  if (topSequence.length === vertexes.length) return topSequence
  else return null
}
