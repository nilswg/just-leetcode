// @ts-check

import { isArrayEqual } from '../bfs-dfs.js';

// 題目鏈結
// https://leetcode.com/problems/flood-fill/

// 題目說明
// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
//
// You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].
//
// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally
// to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally
// to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.
//
// Return the modified image after performing the flood fill.
/**
 * 假如從 [1,1] 的位置開始, 跟改為 2
 *
 * Example 1:
 *
 *   [1, 1, 0],      [2, 2, 0]
 *   [1, 1, 0],  ->  [2, 2, 0]
 *   [1, 0, 1],      [2, 0, 1]
 *
 * Example 2:
 *
 * 假如從 [1,1] 的位置開始, 跟改為 0
 *
 *   [0, 0, 0],      [0, 0, 0]
 *   [0, 0, 0],  ->  [0, 0, 0]
 *   (因為起始顏色跟新填入的顏色相同，所以直接返回)
 */

// 解題重點
// 1.瞭解BFS、DFS
// 2.解題前應能思考出此題更適合用DFS來實作
// 3.注意，當color與 image[sr][sc] 相同時，應該立即返回，不用處理。

// 解題思路

// BFS
//
// 複雜度
// Time Complexity : O(??)
// Space Complexity: O(??)

/**
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

  let quene = [[sr, sc]];
  let m = image.length;
  let n = image[0].length;
  let originalColor = image[sr][sc];

  while (quene.length > 0) {
    const [r, c] = quene.pop();

    // 超出範圍
    if (r < 0 || c < 0 || r >= m || c >= n) {
      continue;
    }

    // 非搜尋目標顏色
    if (image[r][c] !== originalColor) {
      continue;
    }

    image[r][c] = color;

    quene.push([r + 1, c]);
    quene.push([r - 1, c]);
    quene.push([r, c + 1]);
    quene.push([r, c - 1]);
  }
  return image;
};

// DFS
//
// 複雜度
// Time Complexity : O(MN)
// Space Complexity: O(1)

/**
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

  let m = image.length;
  let n = image[0].length;
  let originalColor = image[sr][sc];
  let helper = (r, c) => {
    // 超出範圍
    if (r < 0 || c < 0 || r >= m || c >= n) {
      return;
    }
    // 非搜尋目標顏色
    if (image[r][c] !== originalColor) {
      return;
    }

    image[r][c] = color;

    helper(r + 1, c);
    helper(r - 1, c);
    helper(r, c + 1);
    helper(r, c - 1);
  };

  helper(sr, sc);
  return image;
};

// 自我延伸練習: DFS-BackTracking
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFillBackTracking = function (image, sr, sc, color) {
  let m = image.length;
  let n = image[0].length;
  let originalColor = image[sr][sc];

  let search = (i, j) => {
    // 超出範圍
    if (i < 0 || j < 0 || i >= m || j >= n) return false;

    // 搜尋對象
    if (image[i][j] !== originalColor) return false;

    // 暫存狀態，帶換成無效值，避免被重複設值
    // const temp = image[i][j];
    image[i][j] = -1;

    // 繼續搜尋
    const found =
      search(i - 1, j) ||
      search(i + 1, j) ||
      search(i, j - 1) ||
      search(i, j + 1);

    // 設置新值
    if (!found) {
      image[i][j] = color;
    }

    return found; // 是否繼續搜尋。
  };

  search(sr, sc);

  return image;
};

// 測試
(function () {
  console.log('Testing [p0079_floodFill]...');

  console.log('Testing [floodFillBFS]...');

  console.log(
    isArrayEqual(
      floodFillBFS(
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
    ) === true
  );
  [
    [0, 0, 0],
    [0, 0, 0],
  ];

  console.log(
    isArrayEqual(
      floodFillBFS(
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
    ) === true
  );

  console.log('Testing [floodFillDFS]...');

  console.log(
    isArrayEqual(
      floodFillDFS(
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
    ) === true
  );

  console.log(
    isArrayEqual(
      floodFillDFS(
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
    ) === true
  );

  console.log('Testing [floodFillBackTracking]...');

  console.log(
    isArrayEqual(
      floodFillBackTracking(
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
    ) === true
  );

  console.log(
    isArrayEqual(
      floodFillBackTracking(
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
    ) === true
  );

  console.log('All Testing Passed ✅');
})();
