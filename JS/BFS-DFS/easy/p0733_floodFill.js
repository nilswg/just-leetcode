// @ts-check

import { isArrayEqual } from "../bfs-dfs.js";

// 題目鏈結
// https://leetcode.com/problems/flood-fill

// 題目說明
// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
// You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].
// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.
// Return the modified image after performing the flood fill.
//

// Example 1:
// Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2
// Output: [[2,2,2],[2,2,0],[2,0,1]]
// Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
// Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.
//

// Example 2:
// Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
// Output: [[2,2,2],[2,2,2]]
//

// Constraints:
// m == image.length
// n == image[i].length
// 1 <= m, n <= 50
// 0 <= image[i][j], newColor < 2¹⁶
// 0 <= sr < m
// 0 <= sc < n
//

// 解題重點
// 1.瞭解BFS、DFS，屬於 DFS、BFS 的基礎題型，可以對比 p0200 來看。
// 2.注意，當color與 image[sr][sc] 相同時，應該立即返回，不用處理。
// 3.充分比較DFS與BFS後，發現空間複雜度，使用BFS時為 O(max(m,n)) 優於DFS的 O(mn)。

// 解題思路
// 1. 分別使用 DFS、BFS 來實作。

/**
 * Solution : 使用DFS
 *
 * 時間複雜度分析
 * 由於檢查過的點將不再搜尋，故時間複雜度可視為image上的所有的元素數量，為O(mn)
 *
 * 空間複雜度分析
 * 使用dfs需要額外的stack來儲存狀態，考慮最糟狀況是走訪整個image中的所有元素，故為O(mn)
 * 此題由於起始點並非皆從左上開始，所以也不能固定走訪順序，無法使用 tail-recursion 優化空間複雜度。
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N)   // N, image上的所有的元素數量
 * Space Complexity: O(mn) ≓ O(N)
 *
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFillDFS = function (image, sr, sc, color) {
  // 當進入點已是color時，則不處理。
  if (image[sr][sc] === color) {
    return image;
  }

  const m = image.length;
  const n = image[0].length;
  const beginColor = image[sr][sc];
  const dfs = (r, c) => {
    // 超出範圍
    if (r < 0 || c < 0 || r >= m || c >= n) return;
    // 非搜尋目標顏色
    if (image[r][c] !== beginColor) return;
    image[r][c] = color;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  dfs(sr, sc);
  return image;
};

/**
 * Solution : 使用BFS
 *
 * 時間複雜度分析
 * 由於檢查過的點將不再搜尋，故時間複雜度可視為image上的所有的元素數量，為O(mn)
 *
 * 空間複雜度分析
 * 使用BFS時，需要額外的Queue空間，假設m,n代表image的高與寬。以最糟狀況來看，是起點於中心點開始，
 * 為了便於觀察，假設 m = n 為一正方形，發現最大長度將為 2s(奇數)、2s+1(偶數)，取 O(s) => O(max(m,n)) 
 * (此題可以對比 p0733來看)
 * 
 *  _ |------m------|  m = n = 5 時, ① 代表放入queue的位址。
 *  |  1, ①, 2, ①, 1
 *  |  ①, 2, 2, 2, ①   maxlen : 10
 *  n  ①, 2, 2, 2, ①
 *  |  1, ①, 2, ①, 1
 *  |  1, ①, 2, ①, 1
 * 
 *  _ |----m-----|  m = n = 4 時, ① 代表放入queue的位址。
 *  |  ①, 2, ①, 1
 *  |  ①, 2, ①, 1      maxlen : 7
 *  n  ①, 2, ①, 1
 *  |  1, ①, 1, 1
 *  -
 *
 *  假設 s 代表 queue的最大長度 :
 *  s = 1, maxLen = 1 // 此處 s 為最長邊, 即 s = max(m,n)
 *  s = 2, maxLen = 2
 *  s = 3, maxLen = 6
 *  s = 4, maxLen = 7
 *  s = 5, maxLen = 10
 *  s = 6, maxLen = 11
 *  ...
 *  s = S, maxLen = 2S
 *
 * 故空間複雜度為 O(2S) ≓ O(s) => O(max(m,n))
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N)   // N, image上的所有的元素數量
 * Space Complexity: O(max(m,n))    // max(寬,高)
 *
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFillBFS = function (image, sr, sc, color) {
  // 當進入點已是color時，則不處理。
  if (image[sr][sc] === color) {
    return image;
  }
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const m = image.length;
  const n = image[0].length;
  const beginColor = image[sr][sc];
  const queue = [[sr, sc]];

  image[sr][sc] = color;
  while (queue.length > 0) {
    const [sr, sc] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const r = sr + dr[i];
      const c = sc + dc[i];
      // 超出範圍
      if (r < 0 || c < 0 || r >= m || c >= n) continue;
      // 非搜尋目標顏色
      if (image[r][c] !== beginColor) continue;
      image[r][c] = color;
      // 放入下個位址
      queue.push([r, c]);
    }
  }
  return image;
};

// 測試
(function () {
  console.log("Testing [p0733_floodFill]...");

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(
      isArrayEqual(
        cb(
          [
            [1, 1, 0],
            [1, 1, 0],
            [1, 0, 1],
          ],
          1,
          1,
          2
        ),
        [
          [2, 2, 0],
          [2, 2, 0],
          [2, 0, 1],
        ]
      )
    );

    console.log(
      isArrayEqual(
        cb(
          [
            [0, 0, 0],
            [0, 0, 0],
          ],
          0,
          0,
          0
        ),
        [
          [0, 0, 0],
          [0, 0, 0],
        ]
      )
    );

    console.log(
      isArrayEqual(
        cb(
          [
            [0, 0, 0],
            [0, 1, 0],
          ],
          1,
          1,
          2
        ),
        [
          [0, 0, 0],
          [0, 2, 0],
        ]
      )
    );
  };

  testingWith(floodFillDFS);
  testingWith(floodFillBFS);

  console.log("All Testing Passed ✅");
})();
