/** 保存当前顶点的临近顶点下标 */
type Vertex = number[];
/** 下标为当前顶点 */
type Graph = Vertex[];

/** 生成一个简单的图  0->1->2....n->n+1  */
const getTopGraph = (length: number): Graph => {
  const graph: Graph = [];
  for (let i = 1; i <= length; i++) {
    graph.push(i === length ? [] : [i + 1]);
  }
  return graph;
};

const getGraph = () => [[2, 3, 4], [4, 5], [6], [3, 6, 7], [4, 7], [], [6]];

const simpleTopSort = (graph: Graph) => {
  // 1. 找到一个没有入边的顶点
  // 2. 记录顶点值，移除这个顶点
  // 3. 若顶点已空则返回当前路径
  // 4. 所有顶点均有入边则抛出异常
  const path: number[] = [];
  const used: boolean[] = [];

  for (let i = 0; i < graph.length; i++) {
    const available = graph.findIndex((v, index) => {
      if (used[index]) return;
      return graph.every((vertex) => !vertex.includes(index + 1));
    });
    if (available === -1) throw "此图有圈";
    used[available] = true;

    path.push(available);
    graph[available] = [];
  }

  return path.map((e) => ++e);
};

const topSort = (graph: Graph) => {
  // 1. 计算所有入度的长度
  // 2. 记录入度为零的值到栈,
  // 3. 若栈内有值, 则推出一位并减少临近顶点的入度值, 若产生新的入度为零的顶点, 则退入栈内
  // 4. 循环直到栈为空, 返回路径
  // 5. 若路径顶点数与图的顶点数不一致则抛出异常

  const emptys = [];
  const list: number[] = new Array(graph.length).fill(0);
  graph.forEach((ver) => ver.forEach((v) => list[v - 1]++));
  list.forEach((count, index) => !count && emptys.push(index));

  const path: number[] = [];

  while (emptys.length) {
    const index = emptys.pop();
    graph[index].forEach((idx) => {
      --list[idx - 1] === 0 && emptys.push(idx - 1);
    });
    path.push(index);
  }
  if (path.length !== graph.length) throw "此图有圈";

  return path.map((e) => ++e);
};

const len = 1000;

console.time("simpleTopSort");
console.log(simpleTopSort(getGraph()));
simpleTopSort(getTopGraph(len));
console.timeEnd("simpleTopSort");

console.time("topSort");
console.log(topSort(getGraph()));
topSort(getTopGraph(len));
console.timeEnd("topSort");
