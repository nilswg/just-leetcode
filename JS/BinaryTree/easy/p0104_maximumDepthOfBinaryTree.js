// @ts-check

import { buildTreeNodes, TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/maximum-depth-of-binary-tree

// 題目說明
// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
//

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3
//

// Example 2:
// Input: root = [1,null,2]
// Output: 2
//

// Constraints:
// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100
//

// 解題重點
// 1. 以 Divide&Conquer 來簡化問題，以DFS走訪各節點，並求出最高高度。
// 2. 此題為"getHeight"方法的基本題，其他進階題型可以見如 : p0110、p0543

// 解題思路
// 1.以 Divide&Conquer 來簡化問題，以DFS走訪各節點，並求出其左右子樹高度，取最高者返回
// 2.走到底時(null)返回 0 ，而其上一層節點，高度為 Math.max(0,0) + 1

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let getHeight = (node) => {
    if (!node) return 0;
    let lt = getHeight(node.left);
    let rt = getHeight(node.right);
    return Math.max(lt, rt) + 1;
  };
  return getHeight(root);
};

// 測試
(function () {
  console.log('Testing [p0104_maximumDepthOfBinaryTree]...');

  console.log(maxDepth(buildTreeNodes([3, 9, 20, null, null, 15, 7])) === 3);
  console.log(maxDepth(buildTreeNodes([1, null, 2])) === 2);

  console.log('All Testing Passed ✅');
})();
