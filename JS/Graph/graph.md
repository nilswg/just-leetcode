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

const dfs = function (graph, vertex = 0, values = [], seen = {}) {
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

## Dijkstra Algorithm

---

根據下圖，使用 Dijkstra 方法，找出起點 k, 到達其他相鄰間的最短路徑表(distances)。

```js
/**
 * Directed Acyclic Graph
 *
 *     1---[9]--->2<---[3]---3
 *     |        ⩘ |         ⩘
 *     |       /  |        /
 *    [2]   [4]  [1]    [7]
 *     |   /      |    /
 *     V /        V  /
 *     4---[6]--->5--
 */
const edges = [
  [1, 2, 9],
  [1, 4, 2],
  [2, 5, 1],
  [4, 2, 4],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

/**
 * n=5    k=1
 *
 * curr     connections     distances
 *
 *                          1  2  3  4  5
 *  x       []             [0, ∞, ∞, ∞, ∞]
 *
 *  1       [2,4]          [0, 9, ∞, 2, ∞] //更新2:min(∞,9) ；更新4:min(∞,2)
 *
 *  4       [2,5]          [0, 6, ∞, 2, 8] //更新2:min(9,2+4) ；更新5:∞->min(∞,2+6)
 *
 *  2       [5]            [0, 6, ∞, 2, 7] //更新5:min(8,6+1)
 *
 *  5       [3]            [0, 6, 14,2, 7] //更新3:min(∞,8)
 *
 *  3       [2]            [0, 6, 14,2, 7] //更新2:min(6,14+3)
 *
 *
 *
 * 時間複雜度 : O(E*logN) + O(N*logN) 由於E>>N, 近似 O(ElogN)
 * 空間複雜度 : O(E + N)
 */
const dijkstra = (graph, n, k) => {
  // 無論distances、adjList、heap，均與節點數量(N)有關，空間複雜度: O(N)
  const distances = new Array(n).fill(Infinity);
  const adjList = distances.map(() => []);

  // k 為起始點，到達自身的成本必為0
  distances[k - 1] = 0;

  // 使用 min Heap
  const heap = new PriorityQueue((a, b) => distances[a] < distances[b]);
  heap.push(k - 1);

  // 相鄰節點的的路徑資訊表(Adjacency list)；所有路徑資訊的數量(E)，空間複雜度: O(E)
  for (const [source, target, weight] of graph) {
    adjList[source - 1].push([target - 1, weight]); // 節點=>[目標, 權重]
  }

  // 使用 Priority Queue 進行BFS搜尋，並更新到達其他節點的最短路徑資訊。
  while (!heap.isEmpty()) {
    const curr = heap.pop(); // O(logN)
    const connections = adjList[curr];

    for (const [conn, weight] of connections) {
      // a. 從起點到達 curr 的最短距離，加上從 curr 出發，預計到達其相鄰節點(conn)的距離
      // b. 當前紀錄中，從起點到達 conn 的最短距離
      // 假如 a < b ，表示發現新的到到 conn 的最短路徑，需要更新此路徑資訊。
      const newConnDistance = distances[curr] + weight;
      if (newConnDistance < distances[adj]) {
        distances[conn] = newConnDistance;
        heap.push(conn); // O(logN)
      }
    }
  }

  return distances;
};

dijkstra(edges, 5, 1);
```

## Bellman-Ford Algorithm

---

基於 dijkstra 的缺點，當圖形中含有負權重路徑時:
(1) 參考路徑 [4,2,-6] : 2 原是已經探尋過的節點，然而因負權重的關係，到達 2 的最短路徑被再次更新為更小值。
因負權重路徑，將導致無法準確估計其時間複雜度。
(2) 考慮路徑 [4,1,-9] : 1 作為起點，其路徑成本應是 0(任一節點到達其自身的成本必為 0)，然而，當含有負權重
路徑，可能形成負權迴路(Negative Cycles)，造成最短路徑越走越小，形成計算的無限環圈。

Bellman-Ford 則是對於圖形中含有負權重路徑的問題，能夠進行處理
原理上，是運用動態規劃(Dynamic programming)，能夠整合計算出現過的路徑組合，
根據下圖，便是使用 Bellman-Ford 演算法，找出以起點k, 到達其他節點的最短路徑表(distances)。

其結果而言，
若含有(1)，但不含有(2)的圖形，Bellman-Ford 能夠找出到達其他節點的最短路徑表(distances)。
至於含有(2)的圖形，Bellman-Ford 必能發現，其中含有負權迴路(Negative Cycles)。

```js

/**
 *   1----[2]---->2
 *   | ↖          ↑
 *   |   \        |
 *  [3]   [-9]   [-6]
 *   |         \  |
 *   V          \ |
 *   3----[4]---->4
 *
 * 時間複雜度: O(NE)，N為節點數量；E為路徑數量
 * 空間複雜度: O(N)
 */
const edges = [
  [1, 2, 2],
  [1, 3, 3],
  [3, 4, 4],
  [4, 2, -6],
  [4, 1, -9],
];

const bellman = (graph, n, k) => {
  // distances，k 為起始點，到達自身的成本必為0，空間複雜度: O(N)
  const distances = new Array(n).fill(Infinity);
  distances[k - 1] = 0;

  // 固定執行 n-1 次，每次又有 E 個路徑要檢查，時間複雜度:O(NxE)
  for (let i = 0; i < n - 1; i++) {
    let isUpdate = false;
    for (const [source, target, weight] of graph[i]) {
      const newDistance = distances[source] + weight;
      if (newDistance < distances[target]) {
        distances[target] = newDistance;
        isUpdate = true;
      }
    }
    if (isUpdate === false) break;
  }

  return distances;
};

bellman(edges, 5, 1);
```
