# Graph

圖(graph)類似鏈結串列(LinkedList)、樹(tree)等結構，其為多個節點(node)的集合。
差別於，圖的構成更加多元，可能無頭尾之分，亦無特定走訪順序,這些特性還包括:

- 圖中節點 (vertex, [複]:vertices)
- 可能有環 (cyclic)
- 有向的或無向的 (directed and undirected)
- 有權重的或無權重的 (weighted or unweighted)

<br>

## 以 133. Clone Graph 為例

在問題 133 中，它要求將給定的 graph 進行深拷貝，這意味著我們必須思考如何走訪整的圖。
作法上可以使用 BFS 與 DFS 來實現

## 範例 :

```
      1   4 - 6 - 7
     /   /
    0 - 3 - 5
       /
      2 - 8
```

## BFS

```js
const adjacencyList = [
  [1, 3],
  [0],
  [3, 8],
  [0, 2, 4, 5],
  [3, 6],
  [3],
  [4, 7],
  [6],
  [2],
];

const bfs = function (graph) {
  const seen = {};
  const queue = [0];
  const values = [];

  while (queue.length) {
    const vertex = queue.shift();

    values.push(vertex);
    seen[vertex] = true;

    const connections = graph[vertex];
    for (const connection of connections) {
      if (!seen[connection]) {
        queue.push(connection);
      }
    }
  }

  return values;
};

console.log(bfs(adjacencyList));
```

## DFS

```js
const adjacencyList = [
  [1, 3],
  [0],
  [3, 8],
  [0, 2, 4, 5],
  [3, 6],
  [3],
  [4, 7],
  [6],
  [2],
];

const dfs = function (graph, vertex=0, values=[], seen={}) {

  values.push(vertex);
  seen[vertex] = true;

  const connections = graph[vertex];
  for (const connection of connections) {
    if (!seen[connection]) {
      dfs(graph, connection, values, seen);
    }
  }

  return values;
};

console.log(dfs(adjacencyList));
```
