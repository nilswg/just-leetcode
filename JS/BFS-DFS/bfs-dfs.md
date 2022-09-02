## BFS

廣度優先搜尋

BFS 最佳範例可參考 p0994

### Queue(佇列)

```js
function bfs(start) {
  let queue = new Queue();
  queue.enqueue([start]);

  while (queue.length > 0) {
    const [node] = queue.dequeue();

    // do something...
    process(node);

    // add new nodes to queue
    const newNodes = getNewNodes(node);
    queue.push(newNodes);
  }
}
```

## DFS

深度優先搜尋

```js
function dfs(root) {
  const helper = (node) => {
    if (!node) return;
    helper(node.next);
  };

  helper(root);
}
```

## 2D-Array

---

如何使用 BFS 與 DFS 在 2D 陣列中搜尋。

1. 考慮四個方向: 上、下、左、右

```js
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const traversal = (r, c)=> {
  for (const [dr, dc] of directions) {
    if (grid[r + dr][c + dc]) {...}
  }
}

// or

const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
const traversal = (r, c)=> {
  for (let i = 0; i < 4; i++) {
    if (grid[r + dr[i]][c + dc[i]]) {...}
  }
}
```

### 使用 DFS 走訪 2D-Array
---

```js
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 時間複雜度 : O(mn) ≓ O(N)   // N, 表示grid中所有的元素數量
// 空間複雜度 : O(mn) ≓ O(N)   
const traversalDFS = function (grid, sr, sc) {
  const m = grid.length;
  const n = grid[0].length;
  const seen = new Array(m).fill(0).map((x) => new Array(n).fill(false));
  const ans = [];

  const dfs = function (r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n) return false;
    if (seen[r][c]) return false;
    seen[r][c] = true;
    ans.push(grid[r][c]);
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  }
  dfs(sr, sc);
  return ans;
};

traversalDFS([
  [1, 2, 3], // ↓   ↑ → ↓
  [4, 5, 6], // ↓   ↑   ↓
  [7, 8, 9], // ↓ → ↑   ↓
], 0, 0);

// expect : [ 1, 4, 7, 8, 5, 2, 3, 6, 9 ]
```

### 使用 BFS 走訪 2D-Array

---

```js
// 時間複雜度 : O(mn) ≓ O(N)   // N, 表示grid中所有的元素數量
// 空間複雜度 : O(mn) ≓ O(N)   // 假如固定從左上開始，空間複雜度會變成 O(min(m, n))
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const traversalBFS = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const seen = new Array(m).fill(0).map((x) => Array(n).fill(false));
  const ans = [];
  return bfs(grid, 0, 0, seen, ans);
};

const bfs = function (grid, sr, sc, seen, ans) {
  // initialize seen, ans, queue.
  seen[sr][sc] = true;
  ans.push(grid[sr][sc]);
  const queue = [[sr, sc]];
  // do until queue is empty
  while (queue.length > 0) {
    const [sr, sc] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const r = sr + dr[i];
      const c = sc + dc[i];
      if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) continue;
      if (seen[r][c]) continue;

      seen[r][c] = true;
      ans.push(grid[r][c]);
      queue.push([r, c]);
    }
  }

  return ans;
};

traversalBFS([
  [1, 2, 3], // ⇘ ↗ ↗
  [4, 5, 6], // ↗ ⇘ ↗
  [7, 8, 9], // ↗ ↗ ⇘
]);
// expect : [ 1, 4, 2, 7, 5, 3, 8, 6, 9 ]
// 可以看出 BFS 的主軸朝向是從左上到右下(⇘)，
// 次要得朝向，由於是dr,dc 先上下再左右，所以次要的動向是先下再斜角往右上(↗)
```

### 起始點的影響性
---
走訪時的起始點很重要，若題目如從固定從左上角開始，需走訪所有點時，無論DFS或BFS，我們可以預測其行走路徑。
對於時間複雜度而言，皆要走訪所有點，仍為O(mn)。

但是，對於空間複雜度而言，因固定為左上開始，以DFS而言，不需要當走到死路時，
以"回溯"方式探索接下來的路徑，故每次都從"四個方向"中選擇一個，但能走完全程至右下。
代碼的修改上，先經由isValid判斷可行後，就繼續遞迴，此段改寫成 ```return dfs(r + dr, c + dc)``` 
以 tail-recursion 優化空間複雜度為 O(1)。 

```js
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const traversalDFS = function (grid, sr, sc) {
  const m = grid.length;
  const n = grid[0].length;
  const seen = new Array(m).fill(0).map((x) => new Array(n).fill(false));
  const ans = [];
  const isValid = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n) return false;
    if (seen[r][c]) return false;
    return true;
  };
  const dfs = function (r, c) {
    seen[r][c] = true;
    ans.push(grid[r][c]);
    for (const [dr, dc] of directions) {
      if (isValid(r + dr, c + dc)) {
        return dfs(r + dr, c + dc);
      }
    }
    return ans;
  }
  return dfs(sr, sc);
};

traversalDFS([
  [1, 2, 3], // ↓   ↑ → ↓
  [4, 5, 6], // ↓   ↑   ↓
  [7, 8, 9], // ↓ → ↑   ↓
], 0, 0);
// expect : [ 1, 4, 7, 8, 5, 2, 3, 6, 9 ]

// 如果我們使用 [0,1] 作為起點，則會無法走完全程
traversalDFS([
  [1, 2, 3], // ↓   ↑ → ↓
  [4, 5, 6], // ↓   ↑   ↓
  [7, 8, 9], // ↓ → ↑   ↓
], 0, 1);
// expect : [ 2, 5, 8, 7, 4, 1 ]
```


## 2D-Array Approach

---

cell-value: limited vs unlimited

- limited : 明確的型態，如: 0:空格；1:有元素；2:被標記的元素
- unlimited : [-∞ ... ∞]、[A-Za-z]

Is the relations between the values ?
