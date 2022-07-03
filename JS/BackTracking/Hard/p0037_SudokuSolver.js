// @ts-check

import { isArrayEqual, printElapsedTime } from '../backTracking.js';

// 題目鏈結
// https://leetcode.com/problems/sudoku-solver/

// 題目說明
// Write a program to solve a Sudoku puzzle by filling the empty cells.
//
// A sudoku solution must satisfy all of the following rules:
//  1. Each of the digits 1-9 must occur exactly once in each row.
//  2. Each of the digits 1-9 must occur exactly once in each column.
//  3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
//
// The '.' character indicates empty cells.
//
// Input: board = [
//   ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
//   ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//   ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//   ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//   ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//   ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//   ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//   ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//   ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
// ];
//
// Output: [
//   ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
//   ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
//   ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
//   ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
//   ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
//   ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
//   ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
//   ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
//   ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
// ]
//
// Explanation: The input board is shown above and the only valid solution is shown below:
//
// 解題重點
// 1. 瞭解並使用 BackTracking 實作暴力解，不需要特別的思路。
// 2. 優化速度上，可以把(".")空點先儲存起來。
// 3. 走訪時，返回 true 表示超出範圍或是到底了；
// 4. 走訪時，返回 false表示當前組合無法實現，必須backtracking，重置動作。

// 解題思路
//
// board中，每個點皆可以被表示成: board[ri][ci]
// 根據題目要求，必須讓每個點均遵守，行(col)、列(row)、區塊(box)皆不會重複
// 因此，為了加速其計算，我們可以考慮先遍歷整個 board，把所有訊息都記錄下來。
//
// 1. rowSets 每個row已經存在的點
// 2. colSets 每個col已經存在的點
// 3. boxSets 每個box已經存在的點
//
// set of cols = colSet[ci] = {}
// set of rows = rowSet[ro] = {}
// Box Index : Math.floor(row/3)*3 + Math.floor(col/3)
// -------------------------------
// 00 01 02 | 03 04 05 | 06 07 08 <= ri = 0
// 10 11 12 |          |
// 20 21 22 |       25 |       28
// ------------------------------
// 30 31 32 | 33 34 35 | 36 37 38 <= ri = 3
// 40 11 12 |          |
// 50 51 52 |       55 |       58
// ------------------------------
// 60 61 62 | 63       | 66 67 68 <= ri = 6
// 70 71 72 |          |
// 80 81 82 |       85 |       88
// ------------------------------
// ^col=0    ^col=3     ^col=6
//
// ✨4. 優化重點 : 我們可以儲存空點的位置資訊到陣列中，如此一來，開始走訪時，就不需要理會已經有值部分。
//

// 複雜度
// Time Complexity : O( (N!)^N ) // 每列都有 N! 個組合排列，然後又有 N 列
// Space Complexity: O( N^2 )

/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku_optimal = function (board) {
  const n = board.length;
  const a = Math.sqrt(n);
  const rowSets = Array(n)
    .fill()
    .map((x) => Array(n).fill(0));
  const colSets = Array(n)
    .fill()
    .map((x) => Array(n).fill(0));
  const boxSets = Array(n)
    .fill()
    .map((x) => Array(n).fill(0));
  const emptyPoints = []; // 關鍵於此，記住"."空點

  for (let ri = 0; ri < n; ri++) {
    for (let ci = 0; ci < n; ci++) {
      /** get index of each box */
      const bi = Math.floor(ri / a) * a + Math.floor(ci / a);

      if (board[ri][ci] !== '.') {
        const i = parseInt(board[ri][ci]) - 1;
        rowSets[ri][i] = 1;
        colSets[ci][i] = 1;
        boxSets[bi][i] = 1;
      } else {
        emptyPoints.push({ ri, ci, bi });
      }
    }
  }

  let traverse = (board) => {
    if (emptyPoints.length === 0) {
      return true;
    }

    /**從最後元素開始 */
    const { ri, ci, bi } = emptyPoints[emptyPoints.length - 1];

    for (let i = 0; i < n; i++) {
      if (!(rowSets[ri][i] > 0 || colSets[ci][i] > 0 || boxSets[bi][i] > 0)) {
        board[ri][ci] = (i + 1).toString();
        rowSets[ri][i] = 1;
        colSets[ci][i] = 1;
        boxSets[bi][i] = 1;

        /** 保存先前狀態 */
        const pre = emptyPoints.pop();

        if (traverse(board)) {
          return true;
        }

        /** 狀態重置 */
        board[ri][ci] = '.';
        rowSets[ri][i] = 0;
        colSets[ci][i] = 0;
        boxSets[bi][i] = 0;
        emptyPoints.push(pre);
      }
    }

    return false;
  };

  traverse(board);
};

// 測試
(function () {
  const getBoard = () => {
    return [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ];
  };

  const expect = [
    ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
    ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
    ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
    ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
    ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
    ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
    ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
    ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
    ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
  ];

  console.log('Testing [solveSudoku_optimal]...');

  const b1 = getBoard();
  printElapsedTime(() => solveSudoku_optimal(b1));
  console.log(isArrayEqual(b1, expect) === true);

  /** 當大小變成 16 x 16 時 */
  // let b_lv4_1 = Array(16)
  //   .fill()
  //   .map(() => Array(16).fill('.'));
  // console.log(printElapsedTime(() => solveSudoku_optimal(b_lv4_1)));
  // console.log(b_lv4_1)

  console.log('All Testing Passed ✅');
})();
