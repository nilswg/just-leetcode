// @ts-check

import { isArrayEqual, Queue } from '../bfs-dfs.js';

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
// 1 <= m, n <= 104
// 1 <= m * n <= 104
// mat[i][j] is either 0 or 1.
// There is at least one 0 in mat.
//

// 解題重點
// 1.瞭解DFS、BFS的特性，去說明為什麼BFS會更適合此體
// 2.無論使用DFS或BFS去實作此題，我們依然發現會"超時"(Time Limit Exceeded)
// 3.瞭解多源廣度優先搜尋法(Multi-source BFS) 的應用
// 4.改用DP去實作，優化空間複雜度為O(1)

// 解題思路
// 1.逐點搜尋，使用DFS-BackTracking
// 2.逐點搜尋，使用BFS + Queue
// 3.多點搜尋，使用Muili-source BFS
// 4.使用DP優化BFS

// Solution : DFS-BackTracking
//
// 使用DFS逐點去搜尋(MN)，共有MN個點，會"超時"(Time Limit Exceeded)
//
// 複雜度
// Time Complexity : O((mn)^2)
// Space Complexity: O(mn)

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixDFS = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  let helper = (i, j, d) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return Infinity;
    if (mat[i][j] === -1) return Infinity;
    if (mat[i][j] === 0) return d;

    mat[i][j] = -1;

    let nearest = Math.min(
      helper(i + 1, j, d + 1),
      helper(i - 1, j, d + 1),
      helper(i, j + 1, d + 1),
      helper(i, j - 1, d + 1)
    );

    mat[i][j] = 1; //回復狀態

    return nearest;
  };

  let res = [];
  for (let i = 0; i < m; i++) {
    if (!res[i]) res[i] = [];
    for (let j = 0; j < n; j++) {
      if (mat[i][j] !== 0) {
        res[i][j] = helper(i, j, 0);
      } else {
        res[i][j] = 0;
      }
    }
  }

  return res;
};

// Solution : BFS (單點)
//
// 無論使用DFS、BFS去實作此題，皆會"超時"(Time Limit Exceeded)
// 因為單個點的時間複雜度為 O(MN)，如果要搜尋所有點，則時間複雜度就是 O((MN)^2)
//
// 複雜度
// Time Complexity : O((mn)^2)
// Space Complexity: O(mn)

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixBFS = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  const helper = (si, sj, d = 0) => {
    let queue = new Queue();
    queue.enqueue([si, sj, d]);

    let seen = Array(m)
      .fill(0)
      .map((x) => Array(n).fill(false));
    let directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    while (!queue.isEmpty()) {
      const [i, j, d] = queue.dequeue();
      // if (i < 0 || j < 0 || i >= m || j >= n) continue;
      // if (seen[i][j]) continue;
      // if (mat[i][j] === 0) return d;

      seen[i][j] = true;

      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        // 改成放入前檢查，這可以減少quene的最大數量。
        if (ni < 0 || nj < 0 || ni >= m || nj >= n) continue;
        if (seen[ni][nj]) continue;
        if (mat[ni][nj] === 0) return d + 1;

        queue.enqueue([ni, nj, d + 1]);
      }
    }
    return Infinity;
  };

  let res = [];
  for (let i = 0; i < m; i++) {
    if (!res[i]) res[i] = [];
    for (let j = 0; j < n; j++) {
      if (mat[i][j] !== 0) {
        let a = helper(i, j);
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
 *    因為單個點的時間複雜度為 O(MN)，如果要製作所有點，則時間複雜度就是 O((MN)^2)
 * 2. 使用Multi-Source BFS ，改以多點來搜尋，且以0作為源點，優化時間複雜降為 O(MN)
 *
 * 複雜度
 * Time Complexity : O(mn)
 * Space Complexity: O(mn)
 *
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixMultiSourceBFS = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  let directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let queue = [];
  let qi = 0;
  let dist = Array(m)
    .fill(0)
    .map((x) => Array(n).fill(-1));

  // 先找 0 ，將其作為源點放入queue中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0; // 將源點設置成 0 表示已經拜訪過。
        queue.push([i, j, 0]); //放入源點位址
      }
    }
  }

  while (queue.length > qi) {
    const [i, j, d] = queue[qi];
      qi += 1;

    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;

      // 先判斷避免quene塞入過多無效的點
      // 超出邊界
      if (ni < 0 || nj < 0 || ni >= m || nj >= n) continue;

      // 給他設置距離
      if (dist[ni][nj] === -1) {
        dist[ni][nj] = d + 1;
        queue.push([ni, nj, d + 1]);
      }
    }
  }

    queue.length = 0;
    qi = 0;


  return dist;
};

/**
 * Solution : Muiti-source Dynamical Programming
 *
 * 1. 最後一種解法，是使用了DP的BottomUp 技巧，來優化空間複雜度為 O(1)
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
 *  3. 時間複雜度 O(2x(2xMN)) = O(4xMN)，忽略常數部分，仍為 O(MN)
 *     然而，求解上不需要額外的空間，空間複雜度則優化為 O(1)。
 *
 * 複雜度
 * Time Complexity : O(mn)
 * Space Complexity: O(mn)
 *
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrixDP = function (mat) {
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
  console.log('Testing [p0542_01Matrix]...');

  const testingWith = (cb) => {
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

  console.log('Testing [updateMatrixDFS]...');
  testingWith(updateMatrixDFS);

  console.log('Testing [updateMatrixBFS]...');
  testingWith(updateMatrixBFS);

  console.log('Testing [updateMatrixMultiSourceBFS]...');
  testingWith(updateMatrixMultiSourceBFS);

  console.log('Testing [updateMatrixDP]...');
  testingWith(updateMatrixDP);

  console.log('All Testing Passed ✅');
})();
