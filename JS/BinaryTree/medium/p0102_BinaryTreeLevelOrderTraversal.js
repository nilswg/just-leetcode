// @ts-check
import { buildTreeNodes, isArrayEqual, TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/binary-tree-level-order-traversal/

// 題目說明
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]

// 解題重點
// 1. 由於要層層放入，所以需要一個額外的 level 來定位。
// 2. 題目要求 "由左至右，逐層處理"，因此不可使用DFS方式作答
// 3. 瞭解BFS，使用Queue來實作此題。

// 解題思路

// 使用 DFS 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN) (即樹高，不含儲存結果res的大小)

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderDFS = function (root) {
  let res = [];

  let helper = (root, level) => {
    if (!root) return null;
    if (!res[level]) {
      res[level] = [];
    }
    res[level].push(root.val);
    root.left = helper(root.left, level + 1);
    root.right = helper(root.right, level + 1);
  };

  helper(root, 0);
  return res;
};

// BFS 複雜度 (使用queue)
// Time Complexity : O(N)
// Space Complexity: O(N) (需要額外的queue空間)

/**
 *         3
 *       /   \
 *      9    20
 *           / \
 *          15  7
 *
 *              queue       res
 *   T=0,       [3]         []
 *   T=1,       [9, 20]     [[3]]
 *   T=2,       [15, 7]     [[3],[9, 20]]
 *   T=3,       []          [[3],[9, 20],[15,7]]
 *              (queue已空，終止)
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  let res = [];
  let level = -1;

  while (queue.length > 0) {
    level += 1;

    for (let qi = 0, qlen = queue.length; qi < qlen; qi++) {
      const curNode = queue.shift();
      const curVal = curNode.val;

      if (!res[level]) {
        res[level] = [];
      }

      res[level].push(curVal);

      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }
  }

  return res;
};

// 測試
(function () {
  /**
   *         3
   *       /   \
   *      9    20
   *           / \
   *          15  7
   */

  console.log('Testing [levelOrder by DFS]...');
  console.log(
    isArrayEqual(levelOrderDFS(buildTreeNodes([3, 9, 20, null, null, 15, 7])), [
      [3],
      [9, 20],
      [15, 7],
    ])
  );
  console.log(isArrayEqual(levelOrderDFS(buildTreeNodes([])), []));

  console.log('Testing [levelOrder by BFS]...');
  console.log(
    isArrayEqual(levelOrder(buildTreeNodes([3, 9, 20, null, null, 15, 7])), [
      [3],
      [9, 20],
      [15, 7],
    ])
  );
  console.log(isArrayEqual(levelOrder(buildTreeNodes([])), []));

  console.log('All Testing Passed ✅');
})();

// 其他補充

/**
 * 在LeetCode上，官方上有提供JavaScript的Queue類。所以你可以這樣寫。
 *
 * var levelOrder = function (root) {
 *   const res = [];
 *   if (root === null) return res;
 *
 *   const q = new Queue();
 *   q.enqueue(root);
 *
 *   while (q.size() > 0) {
 *     const level = [];
 *     for (let i = 0, n = q.size(); i < n; i++) {
 *       const node = q.dequeue();
 *       level.push(node.val);
 *       if (node.left) q.enqueue(node.left);
 *       if (node.right) q.enqueue(node.right);
 *     }
 *     res.push(level);
 *   }
 *
 *   return res;
 * };
 */
