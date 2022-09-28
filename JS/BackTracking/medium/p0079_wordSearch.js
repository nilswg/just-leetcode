// @ts-check

// 題目鏈結
// https://leetcode.com/problems/word-search

// 題目說明
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
//

// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
//

// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
//

// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false
//

// Constraints:
// m == board.length
// n = board[i].length
// 1 <= m, n <= 6
// 1 <= word.length <= 15
// board and word consists of only lowercase and uppercase English letters.
// Follow up: Could you use search pruning to make your solution faster with a larger board?
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : DFS - BackTracking
 *
 * Why not BFS?
 * 若使用BFS來搜尋，走訪過程中，相鄰且符合搜尋條件的位址，會同時性地被放入 queue 中，且被視為已探尋過。
 * 這時，但也導致，這些點無訪把彼此當作可以探尋的下一位址。如下圖:
 *
 * e.g : word = 'SEEEFS'
 *       board = [
 *         ['A', 'B', 'C', 'E'],
 *         ['S', 'F', 'E', 'S'],     <= 搜尋到S後，下個被放入的為 [1,2]、[2,3]、[2,3]，
 *         ['A', 'D', 'E', 'E'],        都是'E'，且無法將彼此視作有效的下一位址。
 *       ]
 *
 * 故本題只能一次一點的方式，再以DFS方式去檢查使否有路徑能形成 word。
 *
 * 時間複雜度分析
 * m*n 是board 的大小；w 為 word.length；以最壞的情況下，固定要對 board 上的所有位址個別檢查，才能確定使否有答案。
 * 每次檢查以dfs方式搜尋，搜尋的路徑長度為 w；每一步都有 4個方向。故時間複雜度為 O(mn*w*4)
 *
 * 空間複雜度分析
 * 即dfs走訪時最大深度，最壞情況來看，就是要走訪整個 board ，故空間複雜度為 O(mn)
 *
 * 複雜度
 * Time Complexity : O(mn*w*4) // mn = board size ; w = word.length ;
 * Space Complexity: O(mn)
 *
 * @param {string[][]} board
 * @param {string} word
 * @return {boolean}
 */
var check_board_includes_word = function (board, word) {
  let boardCnt = new Array(26).fill(0);
  for (let i = 0, n = board.length; i < n; i++) {
    for (let j = 0, m = board[i].length; j < m; j++) {
      let idx = board[i][j].charCodeAt(0) % 26;
      boardCnt[idx] += 1;
    }
  }

  for (let i = 0; i < word.length; i++) {
    let idx = word.charCodeAt(i) % 26;
    boardCnt[idx] -= 1;
    if (boardCnt[idx] < 0) {
      return false;
    }
  }
  return true;
};

var existBackTracking = function (board, word) {
  // 對於性能優化非常關鍵。
  const valid = check_board_includes_word(board, word);
  if (!valid) {
    return false;
  }
  // BackTracking 主程式
  const m = board.length;
  const n = board[0].length;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const dfs = (sr, sc, wi) => {
    if (wi === word.length - 1) {
      return true;
    }
    
    board[sr][sc] = ''; // 設值為空，避免重複走訪。
    
    for (let i = 0; i < 4; i++) {
      const r = sr + dr[i];
      const c = sc + dc[i];
      if (r < 0 || c < 0 || r >= m || c >= n) continue;
      if (board[r][c] !== word[wi + 1]) continue;
      if (dfs(r, c, wi + 1)) {
        return true;
      }
    }
    
    board[sr][sc] = word[wi]; // 狀態回復。
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        if (dfs(i, j, 0)) {
          return true;
        }
      }
    }
  }
  return false;
};

// 測試
(function () {
  console.log('Testing [p0079_wordSearch]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb([['a']], 'a') === true);
    console.log(cb([['a', 'a']], 'aa') === true);
    console.log(cb([['a', 'b', 'a']], 'aba') === true);
    console.log(
      cb(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCCED'
      ) === true
    );
    console.log(
      cb(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'SEE'
      ) === true
    );
    console.log(
      cb(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCB'
      ) === false
    );
    console.log(
      cb(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'E', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCESEEEFS'
      ) === true
    );
  };

  testingWith(existBackTracking);

  console.log('All Testing Passed ✅');
})();
