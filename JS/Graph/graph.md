# Graph

### 說明

圖(graph)類似鏈結串列(LinkedList)、樹(tree)等結構，其為多個節點(node)的集合。
差別於，圖的構成更加多元，可能無頭尾之分，亦無特定走訪順序,這些特性還包括:

- 圖中節點 (vertex, [複]:vertices)
- 可能有環 (cyclic)
- 有向的或無向的 (directed and undirected)
- 有權重的或無權重的 (weighted or unweighted)

<br>

## 以 133. Clone Graph 為例

在問題 133 中，它要求將給定的 graph 進行深拷貝，這意味著我們必須思考如何走訪整的圖。

## 範例 :

```
      1   4 - 6 - 7
     /   /
    0 - 3 - 5
       /
      2 - 8
```

### Adjacency List

對於圖中各點與邊的相鄰(adjacent)關係，可以表示為 Adjacency List 的形式，來方便我們進行走訪。

- adjacent(相鄰): 用一條直線連接 u 與 v 兩點，該直線稱其為邊(edge)，而 u,v 兩點間的關係，則稱 u 相鄰於 v。(u and v are adjacent)

作法上，將圖轉換成 Adjacency List 後，便可使用 BFS 與 DFS 來實現走訪。

```js
/**
 *(0) ― (1)
 *  \
 *  (3) ― (2) ― (8)
 *   | \
 *  (4) (5)
 *   |
 *  (6) ― (7)
 */

var numOfVertices = 9; // 節點數量

var edges = [
  [0, 1],
  [0, 3],
  [3, 2],
  [2, 8],
  [3, 4],
  [3, 5],
  [4, 6],
  [6, 7],
];

var adjacencyList = new Array(numOfVertices).fill(0).map(() => []);
for (const [a, b] of edges) {
  adjacencyList[a].push(b);
  adjacencyList[b].push(a);
}
/**
 * adjacencyList = [
 *  0: [ 1, 3 ]
 *  1: [ 0 ]
 *  2: [ 3, 8 ]
 *  3: [ 0, 2, 4, 5 ]
 *  4: [ 3, 6 ]
 *  5: [ 3 ]
 *  6: [ 4, 7 ]
 *  7: [ 6 ]
 *  8: [ 2 ] ]
 */
```

## 使用 BFS 與 DFS 走訪 Adjacency List

### BFS (immutable)

```js
var bfs = function (adj, st) {
  const seen = {};
  const queue = [st];
  const res = [];

  while (queue.length > 0) {
    const cur = queue.shift();
    res.push(cur);
    seen[cur] = true;

    const neighbors = adj[cur];
    for (const nb of neighbors) {
      if (!seen[nb]) {
        queue.push(nb);
      }
    }
  }
  return res;
};

console.log(
  bfs([[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]], 0)
);
// 正確答案: [ 0, 1, 3, 2, 4, 5, 8, 6, 7 ]
```

### BFS (mutable)

```js
var bfs = function (adj, st) {
  const queue = [st]; // 固定以 0 作為起點
  const res = [];

  while (queue.length > 0) {
    const cur = queue.shift();
    res.push(cur);
    const neighbors = adj[cur];
    adj[cur] = []; // delete visited vertex
    for (const nb of neighbors) {
      if (!adj[nb].length) continue;
      queue.push(nb);
    }
  }
  return res;
};

console.log(
  bfs([[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]], 0)
);
// 正確答案: [ 0, 1, 3, 2, 4, 5, 8, 6, 7 ]
```

### DFS (immutable)

```js
var dfs = function (adj, cur = 0, res = [], seen = {}) {
  res.push(cur);
  seen[cur] = true;

  const neighbors = adj[cur];
  for (const nb of neighbors) {
    if (!seen[nb]) {
      dfs(adj, nb, res, seen);
    }
  }

  return res;
};

console.log(
  dfs([[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]])
);
// 正確答案: [ 0, 1, 3, 2, 8, 4, 6, 7, 5 ]
```

### DFS (mutable)

```js
var dfs = function (adj, cur = 0, res = []) {
  if (!adj[cur].length) return;
  res.push(cur);
  const neighbors = adj[cur];
  adj[cur] = []; // delete visited vertex
  for (const nb of neighbors) {
    dfs(adj, nb, res);
  }
  return res;
};

console.log(
  dfs([[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]])
);
// 正確答案: [ 0, 1, 3, 2, 8, 4, 6, 7, 5 ]
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
根據下圖，便是使用 Bellman-Ford 演算法，找出以起點 k, 到達其他節點的最短路徑表(distances)。

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
    for (const [source, target, weight] of graph) {
      const newDistance = distances[source-1] + weight;
      if (newDistance < distances[target-1]) {
        distances[target-1] = newDistance;
        isUpdate = true;
        // console.log(`Update distances[${target - 1}] from ${distances[target - 1]} to ${newDistance}`, distances);
      }
    }
    if (isUpdate === false) break;
  }

  return distances;
};

bellman(edges, 4, 1); // n=4 為節點的總數；k=1 表示起始的節點
```

### degree

The degree of a vertex u is the number of edges incident(作用) on u.
對於 u 而言，其有多少作用於 u，或說存在多少邊與 u 相連，此數量稱為 degree

- incident(作用): 當對於 u,v 而言，存在"作用"關係，若 (u→v) 即 u 作用於 v ；或是 (u⇆v) 稱同時"作用"於 u 與 v 。

```js
var edges = [
  [1, 2],
  [2, 1],
  [1, 4],
  [2, 4],
  [3, 4],
  [2, 3],
  [3, 3],
];

/**
 * e.g: edges: [[1,2],[2,1],[1,4],[2,4],[3,4],[2,3],[3,3]]
 *
 *   1-----4
 *  /|   ∕ |
 *  \| ∕   |
 *   2-----3↩
 *
 * degree(v1) = 3
 * degree(v2) = 4
 * degree(v3) = 3
 * degree(v4) = 3
 *
 *
 *
 * 限制:
 *
 * 建立adjList時，使用 Set 去除不需要理會的 edge
 * 1) 如 [1,2] 與 [2,1] 已經發生重複。
 * 2) 如 [3,3] 沒有意義。
 * 假設 maxNum 為節點所能出現的最大數值。即 0 <= edges[i][0], edges[i][1] <= maxNum
 *
 */
var maxNum = 4;
var degree = new Array(maxNum + 1).fill(0);
var adj = degree.map(() => new Set()); // 如 1)
for (const [a, b] of edges) {
  if (a === b) continue; // 如 2)
  degree[a] += 1;
  degree[b] += 1;
  adj[a].add(b);
  adj[b].add(a);
}
/***
 * 產生結果
 * degree : Array(5) [ 0, 3, 4, 2, 3 ]
 * adj: Array(5) [ [], [ 2, 4 ], [ 1, 4, 3 ], [ 4, 2 ], [ 1, 2, 3 ] ]
 */
```

### indegree vs out outdegree

除此之外，degree 根據進入(to)與離開(from)又可分為 indegree 與 outdegree 兩種。

- indegree : the number of edges going to it，射入該點的邊數量
- outdegree: the number of edges going from it，從該點離開的邊數量

對於單一點而言，其 degree 數量應相等於其 indegree 加上 outdegree，即
=> degree[i] = indegree[i] + outdegree[i];

若以圖上所有節點來看，所有點的 degree 數量加總應等同於 edge 的總數量。

```js
const edges = [
  [1, 4],
  [2, 1],
  [2, 4],
  [2, 3],
  [4, 3],
  [4, 1],
];
/**
 *
 * (1)=<=>=(4)
 *  |     ↗ |
 *  ↑   ↗   ↓
 *  | ↗     |
 * (2)--→--(3)
 *
 * indegree(1) = 2
 * indegree(2) = 0
 * indegree(3) = 2
 * indegree(4) = 2
 *
 * outdegree(1) = 1
 * outdegree(2) = 3
 * outdegree(3) = 0
 * outdegree(4) = 2
 *
 *
 * 限制:
 *
 * 建立adjList時，本次使用 Array 即可，不需要考慮重複的問題。
 * 假設 maxNum 為節點所能出現的最大數值。即 0 <= edges[i][0], edges[i][1] <= maxNum
 *
 */
var maxNum = 4;
var indegree = new Array(maxNum + 1).fill(0);
var outdegree = new Array(maxNum + 1).fill(0);
var adj = indegree.map(() => []);
for (const [a, b] of edges) {
  indegree[b] += 1;
  outdegree[a] += 1;
  adj[a].push(b);
}
/***
 * 產生結果
 * indegree : Array(5) [ 0, 2, 0, 2, 2 ]
 * outdegree : Array(5) [ 0, 1, 3, 0, 2 ]
 * adj: Array(5) [ [], [ 4 ], [ 1, 4, 3 ], [], [3, 1] ]
 */
```
