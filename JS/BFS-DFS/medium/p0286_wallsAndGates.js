// @ts-check

import { isArrayEqual } from "../bfs-dfs.js";

// 題目鏈結
// https://leetcode.com/problems/walls-and-gates

// 題目說明
// You are given a m x n 2D grid initialized with these three possible values.
//  -1 - A wall or an obstacle.
//   0 - A gate.
// INF - Infinity means an empty room.
//
// We use the value 2³¹ - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.
// For example, given the 2D grid:
//
// INF  -1  0  INF
// INF INF INF  -1
// INF  -1 INF  -1
//   0  -1 INF INF
//
// After running your function, the 2D grid should be:
//
//   3  -1   0   1
//   2   2   1  -1
//   1  -1   2  -1
//   0  -1   3   4

// 解題重點
// 1. 瞭解基本 BFS、DFS 於2d-array走訪。
// 2. 使用 Muiti-source BFS 實作出時間複雜度O(N)的作法。
// 3. 使用 DFS 實作出時間複雜度O(N)的作法。

// 解題思路
// 1. 搜尋空格(INF)填入到達距離gate最近的距離，其他，如遇到wall(-1)或gate(0)皆不理會。
// 2. 暴力解是使用 BFS、DFS，逐點從空格(INF)位址，搜尋其到達gate的最短距離，時間複雜度為 O(N²)。
// 3. 當我們轉換思維，反向從 gate 位址作為起始點去搜尋空格位址，將能優化時間複雜度為 O(N)。

/**
 * Solution : Muiti-source BFS (從門到空格)
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 *
 * @param {number[][]} rooms
 * @returns {number[][]}
 */
const wallsAndGatesMultiSourceBFS = (rooms) => {
  const INF = 2147483647;
  const m = rooms.length;
  const n = rooms[0].length;
  const queue = [];
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) {
        // 0: gate
        queue.push([i, j, 0]);
      }
    }
  }

  while (queue.length > 0) {
    const [sr, sc, d] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const r = sr + dr[i];
      const c = sc + dc[i];
      if (r < 0 || c < 0 || r >= m || c >= n) continue;
      if (rooms[r][c] !== INF) continue; // 只考慮 INF 部分(尚未被設置距離)，若遇到 gate、Wall、已被填入距離皆跳過

      rooms[r][c] = d + 1;
      queue.push([r, c, d + 1]);
    }
  }

  return rooms;
};

/**
 * Solution : From Gates To Empty DFS (從門到空格的DFS)
 *
 * DFS 的實作上，仍然是逐點進行搜尋，但是起始點改從 gate 開始。
 * 0.起始點(d = 0) : 填入 0 繼續搜尋。
 * 1.n步後 (d > 0) :
 *   (1) 碰到 0 (門)，因 d > 0，直接返回。
 *   (2) 碰到 -1(牆)，因 d > 0，直接返回。
 *   (3) 碰到 Infinity(空格)，因 d < Infinity，填入 d，繼續搜尋。
 *   (4) 又n步後，由於 d+n > d，直接返回。
 * 
 * 可以看出，僅首次d=0，或遇到INF 時會填入並繼續搜尋；其餘遇到gate、wall、以填入距離，都會直接返回。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 */
/**
 * @param {number[][]} rooms
 * @returns {number[][]}
 */
const wallsAndGatesDFSFromGates = (rooms) => {
  const m = rooms.length;
  const n = rooms[0].length;
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  const dfs = (r, c, d) => {
    if (r < 0 || c < 0 || r >= m || c >= n) return;
    // 僅首次d=0，或遇到INF 時會填入並繼續搜尋；其餘遇到gate、wall、以填入距離，都會直接返回。
    if (d > rooms[r][c]) return;
    rooms[r][c] = d;

    for (let i = 0; i < 4; i++) {
      dfs(r + dr[i], c + dc[i], d + 1);
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) {
        // 0: gate
        dfs(i, j, 0);
      }
    }
  }

  return rooms;
};

// 測試
(function () {
  console.log("Testing [p0286_wallsAndGates]...");

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);

    const INF = 2147483647;
    console.log(isArrayEqual(cb([[INF, -1, 0, INF]]), [[INF, -1, 0, 1]]));
    console.log(
      isArrayEqual(
        cb([
          [0, -1, 0, INF],
          [INF, -1, -1, INF],
        ]),
        [
          [0, -1, 0, 1],
          [1, -1, -1, 2],
        ]
      )
    );
    console.log(
      isArrayEqual(
        cb([
          [INF, -1, 0, INF],
          [INF, INF, INF, 0],
          [INF, -1, INF, -1],
          [0, -1, INF, INF],
        ]),
        [
          [3, -1, 0, 1],
          [2, 2, 1, 0],
          [1, -1, 2, -1],
          [0, -1, 3, 4],
        ]
      )
    );
  };

  testingWith(wallsAndGatesMultiSourceBFS);
  testingWith(wallsAndGatesDFSFromGates);

  console.log("All Testing Passed ✅");
})();
