// 参考：./000.jpg
import { TopSort, Vertex } from '.'
const data = [
  { key: 1, adjacents: [2, 3, 4] },
  { key: 2, adjacents: [4, 5] },
  { key: 3, adjacents: [6] },
  { key: 4, adjacents: [3, 6, 7] },
  { key: 5, adjacents: [4, 7] },
  { key: 6, adjacents: [] },
  { key: 7, adjacents: [6] }
]

const vertexes = data.map(item => {
  const vertex = new Vertex<number>()
  vertex.element = item.key
  return vertex
})

data.forEach(item => {
  const findVertex = (key: number) => vertexes.find(vertex => vertex.element === key)
  const vertex = findVertex(item.key)
  item.adjacents.forEach(ele => vertex.adjacents.push(findVertex(ele)))
})

console.log(TopSort(vertexes))
