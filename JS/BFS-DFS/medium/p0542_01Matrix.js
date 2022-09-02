// @ts-check

import { isArrayEqual, Queue } from "../bfs-dfs.js";

// 題目鏈結
// https://leetcode.com/problems/01-matrix

// 題目說明
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// The distance between two adjacent cells is 1.
//

// Example 1:
// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]
//

// Example 2:
// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]
//

// Constraints:
// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 10⁴
// 1 <= m * n <= 10⁴
// mat[i][j] is either 0 or 1.
// There is at least one 0 in mat.
//

// 解題重點
// 1.瞭解DFS、BFS的特性。
// 2.相當經典題型，綜合多個使用DFS、BFS走訪2D-Array時，需要思考並掌握的技巧。
// 3.說明為何使用DFS、BFS 逐點驗證會導致超時(Time Limit Exceeded)，時間複雜度為O(N^2)
// 4.瞭解多源廣度優先搜尋法(Multi-source BFS)，並逆向思考將元素值0作為起始點。優化時間複雜度為O(N)
// 5.瞭解起始點對於結果的影響，並先後以左上與右下作為起始點去走訪，優化空間複雜度為O(1)

// 解題思路
// 1.循序單點搜尋，使用DFS-BackTracking
// 2.循序單點搜尋，使用BFS
// 3.多點搜尋，使用Muili-source BFS
// 4.先後以左上與右下作為起始點，使用BFS走訪

// Solution : DFS-BackTracking
//
// 使用DFS逐點去搜尋(mn)，共有mn個點，會"超時"(Time Limit Exceeded)
//
// 複雜度
// Time Complexity : O((mn)^2) ≓ O(N^2)  // N, matrix中所有的元素數量
// Space Complexity: O(mn) ≓ O(N)

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixDFS = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  let dfs = (r, c, d) => {
    if (r < 0 || c < 0 || r >= m || c >= n) return Infinity;
    if (mat[r][c] === -1) return Infinity;
    if (mat[r][c] === 0) return d;

    mat[r][c] = -1;

    let nearest = Math.min(
      dfs(r + 1, c, d + 1),
      dfs(r - 1, c, d + 1),
      dfs(r, c + 1, d + 1),
      dfs(r, c - 1, d + 1)
    );

    mat[r][c] = 1; //回復狀態

    return nearest;
  };

  let res = [];
  for (let i = 0; i < m; i++) {
    if (!res[i]) res[i] = [];
    for (let j = 0; j < n; j++) {
      if (mat[i][j] !== 0) {
        res[i][j] = dfs(i, j, 0);
      } else {
        res[i][j] = 0; // 自身為0，距離為0
      }
    }
  }

  return res;
};

// Solution : BFS (單點)
//
// 無論使用DFS、BFS去實作此題，皆會"超時"(Time Limit Exceeded)
// 因為單個點的時間複雜度為 O(mn)，如果要搜尋所有點，則時間複雜度就是 O((mn)^2)
//
// 複雜度
// Time Complexity : O((mn)^2) ≓ O(N^2)  // N, matrix中所有的元素數量
// Space Complexity: O(mn) ≓ O(N)

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixBFS = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const bfs = (sr, sc, d = 0) => {
    const queue = new Queue();
    queue.enqueue([sr, sc, d]);

    const seen = Array(m)
      .fill(0)
      .map((x) => Array(n).fill(false));

    while (!queue.isEmpty()) {
      const [sr, sc, d] = queue.dequeue();
      seen[sr][sc] = true;

      for (const [dr, dc] of directions) {
        const r = sr + dr;
        const c = sc + dc;

        // 改成放入前檢查，這可以減少queue的最大數量。
        if (r < 0 || c < 0 || r >= m || c >= n) continue;
        if (seen[r][c]) continue;
        if (mat[r][c] === 0) return d + 1;

        queue.enqueue([r, c, d + 1]);
      }
    }
    return Infinity;
  };

  let res = [];
  for (let i = 0; i < m; i++) {
    if (!res[i]) res[i] = [];
    for (let j = 0; j < n; j++) {
      if (mat[i][j] !== 0) {
        let a = bfs(i, j);
        res[i][j] = a;
      } else {
        res[i][j] = 0;
      }
    }
  }

  return res;
};

/**
 * Solution : Muiti-source BFS (多點)
 *
 * 1. 即使使用了DFS去實作此題，我們依然發現會"超時"(Time Limit Exceeded)
 *    因為單個點的時間複雜度為 O(mn)，如果要製作所有點，則時間複雜度就是 O((mn)^2)
 * 2. 使用Multi-Source BFS ，改以多點來搜尋，且以0作為源點，優化時間複雜降為 O(mn)
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N)   // N, matrix中所有的元素數量
 * Space Complexity: O(mn) ≓ O(N)
 *
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixMultiSourceBFS = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  const dist = Array(m)
    .fill(0)
    .map((x) => Array(n).fill(-1));

  const queue = [];

  // 先找 0 ，將其作為源點放入queue中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0; // 將源點設置成0，標記為已拜訪元素。
        queue.push([i, j, 0]); //放入源點位址
      }
    }
  }

  while (queue.length > 0) {
    const [sr, sc, d] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const r = sr + dr[i];
      const c = sc + dc[i];

      // 先判斷避免queue塞入過多無效的點
      // 超出邊界
      if (r < 0 || c < 0 || r >= m || c >= n) continue;

      // 給他設置距離
      if (dist[r][c] === -1) {
        dist[r][c] = d + 1;
        queue.push([r, c, d + 1]);
      }
    }
  }

  return dist;
};

/**
 * Solution : 固定起點的DFS
 *
 * 1. 當起始點固定為左上時，使用DFS走訪時，可以透過tail-recursion 來優化空間複雜度為 O(1)
 *    本題實作上，此過程為循序搜尋，我們改以 for-loop 去實作即可。
 * 
 * 2. mat 中的每一個cell的值都是根據其 上、下、左、右 四個方向來決定，即
 *
 *    dst = Math.min(cell.top, cell.left, cell.bottom, cell.right) + 1
 *
 *    e.g:
 *            0
 *          0 1 0  -> dst = Math.min(0,0,0,0) + 1
 *            0
 *
 *    如此一來，我們需要先取一中心點往外走訪，再由四個角落向中心點走訪，才能實現。
 *    但是，這實作起來相當麻煩，於是改為左上至下右一組；下右至左上一組去走訪，表示為:
 *
 *    dst = Math.min(cell.top, cell.left) +1,
 *    dst = Math.min(dst, Math.min(cell.bottom, cell.right) + 1 )
 *
 *    e.g:
 *            0
 *          0 1  +  1 0  -> dst = Math.min( Math.min(0, 0) +1 , Math.min(0, 0) + 1 )
 *                  0                       (左上)               (右下)
 *
 *  3. 時間複雜度 O(2(2mn)) = O(4mn)，忽略常數部分，仍為 O(mn)
 *     然而，求解上不需要額外的空間，空間複雜度則優化為 O(1)。
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N) // N, matrix中所有的元素數量
 * Space Complexity: O(1)
 *
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixDFSOptimal = function (mat) {
  let m = mat.length;
  let n = mat[0].length;
  const INF = m + n;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] !== 0) {
        let up = mat[i - 1]?.[j] ?? INF;
        let lt = mat[i]?.[j - 1] ?? INF;
        mat[i][j] = Math.min(up + 1, lt + 1);
      }
    }
  }

  for (let i = m - 1; i > -1; i--) {
    for (let j = n - 1; j > -1; j--) {
      if (mat[i][j] !== 0) {
        let dn = mat[i + 1]?.[j] ?? INF;
        let rt = mat[i]?.[j + 1] ?? INF;
        mat[i][j] = Math.min(mat[i][j], dn + 1, rt + 1);
      }
    }
  }

  return mat;
};

// 測試
(function () {
  console.log("Testing [p0542_01Matrix]...");

  const testingWith = (cb) => {
    console.log(`Testing [${cb.name}]`)
    console.log(
      isArrayEqual(
        cb([
          [0, 0, 0],
          [0, 1, 0],
          [1, 1, 1],
        ]),
        [
          [0, 0, 0],
          [0, 1, 0],
          [1, 2, 1],
        ]
      )
    );
  };

  testingWith(updateMatrixDFS);
  testingWith(updateMatrixBFS);
  testingWith(updateMatrixMultiSourceBFS);
  testingWith(updateMatrixDFSOptimal);

  console.log("All Testing Passed ✅");
})();
