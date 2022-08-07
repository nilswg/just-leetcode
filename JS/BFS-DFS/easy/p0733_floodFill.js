// @ts-check

import { isArrayEqual } from '../bfs-dfs.js';

// 題目鏈結
// https://leetcode.com/problems/flood-fill/

// 題目說明

// 解題重點

// 解題思路

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
var floodFill = function (image, sr, sc, color) {
  let m = image.length;
  let n = image[0].length;

  let search = (i, j, k) => {
    // 超出範圍
    if (i < 0 || j < 0 || i >= m || j >= n) return false;

    // 搜尋對象
    if (image[i][j] !== k) return false;

    // 暫存狀態
    const temp = image[i][j];

    // 帶換成無效值，避免被重複設值
    image[i][j] = -1;

    // 繼續搜尋
    const found =
      search(i - 1, j, k) ||
      search(i + 1, j, k) ||
      search(i, j - 1, k) ||
      search(i, j + 1, k);

    // 設置新值
    if (!found) {
      image[i][j] = color;
    }

    return found; // 是否繼續搜尋。
  };

  search(sr, sc, image[sr][sc]);

  return image;
};

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

    //return;
  };

  helper(sr, sc);
  return image;
};

// 測試
(function () {
  console.log('Testing [p0079_floodFill]...');

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

  console.log('All Testing Passed ✅');
})();
