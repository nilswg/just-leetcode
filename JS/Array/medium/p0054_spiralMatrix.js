// @ts-check

// 題目鏈結
// https://leetcode.com/problems/spiral-matrix

// 題目說明
// Given an m x n matrix, return all elements of the matrix in spiral order.
//

// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
//

// Example 2:
// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]
//

// Constraints:
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
// -100 <= matrix[i][j] <= 100
//

// 解題重點
// 1. 單純 2D-Array 走訪的實作題。

// 解題思路
// 1. 走訪順序為 右、下、左、上，且至底後才改變方向。
// 2. 先自行以暴力法方式實作。避免已走過的點被重覆走訪，可以使用Seen的陣列來檢查。
// 3. 思考優化解，將空間複雜度優化 O(1)

/**
 * Solution :
 *
 * 透過額外的 seen 來存放走過的點，大小為 m*n，故空間複雜度為 O(mn) ≒ (N)
 *
 *  [[1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9, 10,11,12],
 *   [13,14,15,16]]
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrderBrute = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dr = [0, 1, 0, -1]; // 右、下、左、上
  const dc = [1, 0, -1, 0];
  const seen = matrix.map((x) => new Array(n).fill(false));
  const res = [];

  let count = m * n;
  let sr = 0;
  let sc = -1; // 因為從往右起始，故意將sc設值為-1

  while (count > 0) {
    for (let i = 0; i < 4; i++) {
      let r = sr + dr[i];
      let c = sc + dc[i];

      while (r >= 0 && c >= 0 && r < m && c < n && !seen[r][c]) {
        seen[r][c] = true;
        res.push(matrix[r][c]);
        sr = r;
        sc = c;
        r = sr + dr[i];
        c = sc + dc[i];
        count -= 1;
      }
    }
  }

  return res;
};

/**
 * Solution: 最佳解
 *
 * 透過四個會不斷移動的邊界 top(rowMin)、right(colMax)、left(colMin)、bottom(rowMax) 來限縮查找範圍，避免重覆走訪過相同的點，
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrderOptimal = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const N = m * n;
  const res = [];

  let rowTop = 0;
  let rowBottom = m - 1;
  let colLeft = 0;
  let rowRight = n - 1;

  while (rowTop <= rowBottom || colLeft <= rowRight) {
    // 向右
    for (let i = colLeft; i <= rowRight; i++) {
      res.push(matrix[rowTop][i]);
    }
    rowTop += 1;
    if (res.length === N) break;

    // 向下
    for (let i = rowTop; i <= rowBottom; i++) {
      res.push(matrix[i][rowRight]);
    }
    rowRight -= 1;
    if (res.length === N) break;

    // 向左
    for (let i = rowRight; i >= colLeft; i--) {
      res.push(matrix[rowBottom][i]);
    }
    rowBottom -= 1;
    if (res.length === N) break;

    // 向上
    for (let i = rowBottom; i >= rowTop; i--) {
      res.push(matrix[i][colLeft]);
    }
    colLeft += 1;
    if (res.length === N) break;
  }

  return res;
};

// 測試
(function () {
  console.log('Testing [p0054_spiralMatrix]...');

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(
      isEqual(
        cb([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]),
        [1, 2, 3, 6, 9, 8, 7, 4, 5]
      )
    );
    console.log(
      isEqual(
        cb([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
        ]),
        [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
      )
    );
    console.log(
      isEqual(
        cb([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ]),
        [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
      )
    );
  };

  testingWith(spiralOrderBrute);
  testingWith(spiralOrderOptimal);

  console.log('All Testing Passed ✅');
})();
