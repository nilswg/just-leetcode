// @ts-check

import { TreeNode, buildTreeNodes } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/diameter-of-binary-tree

// 題目說明
// Given the root of a binary tree, return the length of the diameter of the tree.
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
// The length of a path between two nodes is represented by the number of edges between them.
//

// Example 1:
// Input: root = [1,2,3,4,5]
// Output: 3
// Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
//

// Example 2:
// Input: root = [1,2]
// Output: 1
//

// Constraints:
// The number of nodes in the tree is in the range [1, 10^4].
// -100 <= Node.val <= 100
//

// 解題重點
// 1. 左右兩子樹個別的最大深度的總和(leftMaxHight + rightMaxHeight)，才有可能找出最長的路徑。
// 2.

// 解題思路
// 1. 使用 DFS 走訪各點，根據各點左右子樹的最大深度，計算出最長路徑。
// 2.

/** Solution : 使用 DFS
 *
 * 空間複雜度分析
 * O(logN) ； 連 null 都要考慮。
 * 
 * e.g [1, null, 2, null, 3, null, 4]
 *
 *         1
 *        / \
 *       2  null
 *      / \
 *     3  null
 *    / \
 *   4  null
 *
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(logN)
 *
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let longestPath = 0; // longest path

  let getHeight = (node) => {
    if (!node) return 0;
    let leftMaxHeight = getHeight(node.left);
    let rightMaxHeight = getHeight(node.right);
    longestPath = Math.max(longestPath, leftMaxHeight + rightMaxHeight);
    return Math.max(leftMaxHeight, rightMaxHeight) + 1;
  };

  getHeight(root);

  return longestPath;
};

// 測試
(function () {
  console.log('Testing [p0543_diameterOfBinaryTree]...');

  console.log(diameterOfBinaryTree(buildTreeNodes([1, 2, 3, 4, 5])) === 3);
  console.log(diameterOfBinaryTree(buildTreeNodes([1, 2])) === 1);
  console.log(
    diameterOfBinaryTree(
      buildTreeNodes([
        4,
        -7,
        -3,
        null,
        null,
        -9,
        -3,
        9,
        -7,
        -4,
        null,
        6,
        null,
        -6,
        -6,
        null,
        null,
        0,
        6,
        5,
        null,
        9,
        null,
        null,
        -1,
        -4,
        null,
        null,
        null,
        -2,
      ])
    ) === 8
  );

  console.log('All Testing Passed ✅');
})();
