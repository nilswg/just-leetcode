// @ts-check

import { TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

// 題目說明
// Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.
//
// According to the definition of LCA on Wikipedia:
//  “The lowest common ancestor is defined between two nodes p and q as the lowest node in T
//   that has both p and q as descendants (where we allow a node to be a descendant of itself).”
//
// Example 1:
//
//              6
//            /   \
//           2     8
//         /  \   /  \
//        0   4   7   9
//           / \
//           3 5
//
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// Output: 6
// Explanation: The LCA of nodes 2 and 8 is 6.

// 解題重點
// 1. 瞭解什麼是 LCA ? 即 "最小的共通祖先節點"
// 2. 關鍵在於 root的大小必定會介於左右子節點之間，以divide and conquer 來分析並處理
//    (1) 若 p, q 都小於 root 則 LCA 必定在左子樹
//    (2) 若 p, q 都大於 root 則 LCA 必定在右子樹
//    (3) 若 p <= root <= q, 則 root 即是 LCA 。(即是答案)

// 解題思路

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let dfs = (root, p, q) => {
    if (root.val > p.val && root.val > q.val) {
      return dfs(root.left, p, q);
    } else if (root.val < p.val && root.val < q.val) {
      return dfs(root.right, p, q);
    } else {
      return root;
    }
  };
  return dfs(root, p, q);
};

// 測試
(function () {
  console.log('Testing [p0235_LowestCommonAncestorofaBinarySearchTree]...');

  let q1 = new TreeNode(
    6,
    new TreeNode(
      2,
      new TreeNode(0),
      new TreeNode(4, new TreeNode(3), new TreeNode(5))
    ),
    new TreeNode(8, new TreeNode(7), new TreeNode(9))
  );

  console.log(
    lowestCommonAncestor(q1, new TreeNode(2), new TreeNode(8)).val === 6
  );

  let q2 = new TreeNode(
    6,
    new TreeNode(
      2,
      new TreeNode(0),
      new TreeNode(4, new TreeNode(3), new TreeNode(5))
    ),
    new TreeNode(8, new TreeNode(7), new TreeNode(9))
  );
  console.log(
    lowestCommonAncestor(q2, new TreeNode(2), new TreeNode(4)).val === 2
  );

  let q3 = new TreeNode(2, new TreeNode(1));
  console.log(
    lowestCommonAncestor(q3, new TreeNode(2), new TreeNode(1)).val === 2
  );

  console.log('All Testing Passed ✅');
})();
