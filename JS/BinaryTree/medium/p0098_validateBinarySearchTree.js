// @ts-check

import { buildTreeNodes, TreeNode } from "../binaryTree.js";

// 題目鏈結
// https://leetcode.com/problems/validate-binary-search-tree

// 題目說明
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
// A valid BST is defined as follows:
// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
//

// Example 1:
// Input: root = [2,1,3]
// Output: true
//

// Example 2:
// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.
//

// Constraints:
// The number of nodes in the tree is in the range [1, 10^4].
// -2^31 <= Node.val <= 2^31 - 1
//

// 解題重點
// 1. 分析DFS為何比BFS更適合此題，DFS較佳。
// 2. 任一節點的有效性決定於由上層逐層往下傳遞的 lower 與 upper。使 lower < node.val < upper 。

// 解題思路
// 1. 判斷是否有效的過程中，執行的順序無意義，且空間複雜度DFS對比BFS，O(N): O(logN)，DFS較佳。
// 2. 從根節點開始，逐層往下傳遞 lower, upper 兩個依據，當 lower < node.val < upper 時，表示該節點有效，繼續往下。
// 3. lower, upper 始於根根點，預設為 lower = -Infinity,  upper = Infinity 。

// Solution : 使用 DFS
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const dfs = (node, min, max) => {
    if (!node) return true;
    if (min >= node.val || node.val >= max) return false;
    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  };
  return dfs(root, -Infinity, Infinity);
};
// 測試
(function () {
  console.log("Testing [p0098_validateBinarySearchTree]...");

  /**
   * @param { (root: TreeNode) => boolean } cb
   */
  const testingWith = (cb) => {
    console.log(cb(buildTreeNodes([1])) === true);
    console.log(cb(buildTreeNodes([1, 2, 3])) === false);
    console.log(cb(buildTreeNodes([2, 1, 3])) === true);
    console.log(cb(buildTreeNodes([5, 1, 4, null, null, 3, 6])) === false);
    console.log(cb(buildTreeNodes([5, 1, 7, null, null, 6, 8])) === true);
  };

  console.log("Testing [isValidBST]");
  testingWith(isValidBST);

  console.log("All Testing Passed ✅");
})();
