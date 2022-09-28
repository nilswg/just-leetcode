// @ts-check

import { buildTreeNodes, isArrayEqual, TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/binary-tree-right-side-view

// 題目說明
// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
//

// Example 1:
// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]
//

// Example 2:
// Input: root = [1,null,3]
// Output: [1,3]
//

// Example 3:
// Input: root = []
// Output: []
//

// Constraints:
// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100
//

// 解題重點
// 1. 瞭解二元樹的走訪

// 解題思路
// 1. 實作上可以參考 p0102
// 2. 分別使用 BFS、DFS 來實作

/**
 * Solution : 使用BFS
 * 
 * 空間複雜度分析
 * 最糟情況，要把最底層所有元素放入queue，其數量為 n/2，故空間複雜度為 O(n/2) ≒ O(n)
 *
 * 複雜度
 * Time Complexity : O(n) // n 為所有樹節點數量
 * Space Complexity: O(n) 
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideViewBFS = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length > 0) {
    const n = queue.length;
    const last = queue[n - 1];
    res.push(last.val);
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return res;
};

/**
 * Solution : 使用DFS
 * 
 * 使用DFS時，先透過 getHeight 查找出最大高度 maxH，每次下探一層時，透過 depth+1 來表示其高度。
 * 如第 i 層時，其depth = i，把 node.val 寫入到 res 中，如 res[depth] = node.val。
 * 由於先走左邊，才走右邊，所以就算先填入左側的元素，最終也會再被右側覆蓋為正確的結果。
 *
 * 空間複雜度分析
 * (1) 相較於 BFS，使用DFS走訪時，棧的中最大長度為二元樹的高度，故為O(logN)
 * (2) 此題無法使用 tail-recursion 進行空間壓縮，須考慮此情況:
 *         1
 *        / \
 *       2   3    <= 若都優先僅選右邊或左邊，此處優先選擇右側 3
 *      /\   /\
 *     x  5 x  x  <= 已經選擇右側3，如果不回溯便選不到左側的 5
 *
 * 複雜度
 * Time Complexity : O(n)
 * Space Complexity: O(logn) // 即深度
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideViewDFS = function (root) {
  if (!root) return [];

  const getHeight = (node) => {
    if (!node) return 0;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  };

  const maxH = getHeight(root);
  const res = new Array(maxH).fill(0);

  const dfs = (node, depth) => {
    if (!node) return;
    res[depth] = node.val;
    if (node.left) {
      dfs(node.left, depth + 1);
    }
    if (node.right) {
      dfs(node.right, depth + 1);
    }
  };

  dfs(root, 0);
  return res;
};

/**
 * Solution : DFS 寫法最佳化
 * 
 * 此方法不需要先透過 getHeight 去查找樹的最大高度，而是透過 level，當 res.length < level 時才可填入新值，
 * 能控管相同高度下，僅能寫入至 res 一次。
 * (1) level 初始為 1
 * (2) 搜尋改為從右開始，再往左側搜尋，若右側已經寫入時，左側元素便無法重覆填入。
 *
 * 複雜度
 * Time Complexity : O(n)
 * Space Complexity: O(logn) //即深度
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideViewDFSOptimal = function (root) {
  if (!root) return [];
  const res = [];
  const dfs = (node, level) => {
    if (res.length < level) {
      res.push(node.val);
    }
    if (node.right) {
      dfs(node.right, level + 1);
    }
    if (node.left) {
      dfs(node.left, level + 1);
    }
  };
  dfs(root, 1);
  return res;
};

// 測試
(function () {
  console.log('Testing [p0199_binaryTreeRightSideView]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(
      isArrayEqual(cb(buildTreeNodes([1, 2, 3, null, 5, null, 4])), [1, 3, 4])
    );
    console.log(
      isArrayEqual(
        cb(buildTreeNodes([1, 2, 3, null, 5, null, null])),
        [1, 3, 5]
      )
    );
    console.log(isArrayEqual(cb(buildTreeNodes([1, null, 3])), [1, 3]));
    console.log(isArrayEqual(cb(buildTreeNodes([])), []));
  };

  testingWith(rightSideViewBFS);
  testingWith(rightSideViewDFS);
  testingWith(rightSideViewDFSOptimal);

  console.log('All Testing Passed ✅');
})();
