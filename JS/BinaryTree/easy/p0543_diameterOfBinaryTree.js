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
// 1.
// 2.

// 解題思路
// 1.
// 2.

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let res = 0;

  let getHeight = (node) => {
    if (!node) return 0;
    let lt = getHeight(node.left);
    let rt = getHeight(node.right);
    res = Math.max(res, lt + rt);
    return Math.max(lt, rt) + 1;
  };

  getHeight(root);

  return res;
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
