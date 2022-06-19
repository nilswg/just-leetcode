// @ts-check
import { TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/same-tree/

// 題目說明
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// 解題重點
// 1. 樹的走訪

// 解題思路

// 暴力解
//
// 先走訪完得到兩者的結果，再逐一比較該結果。
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N) //需要額外的儲存空間

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree_Brute = function (p, q) {
  let l1 = [];
  let l2 = [];
  let helper = (root, list) => {
    list.push(root?.val);
    if (!root) return null;
    root.left = helper(root.left, list);
    root.right = helper(root.right, list);
  };
  helper(p, l1);
  helper(q, l2);

  let isEqual = (l1, l2) => {
    if (l1.length !== l2.length) return false;
    for (let i = 0, n = l1.length; i < n; i++) {
      if (l1[i] !== l2[i]) return false;
    }
    return true;
  };
  return isEqual(l1, l2);
};

// 最佳解
//
// 將比較過程整合在一起，不需要額外的空間儲存，優化空間複雜度為O(N) -> O(1)
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const helper = (p, q) => {
    // 表示兩邊都走到底，返回true。
    if (p === null && q === null) return true;
    // 無論是 p && !q 或 !p && q 或 p && q && p.val !== q.val，都返回 false。
    if ((p && !q) || (!p && q) || p.val !== q.val) return false;

    return helper(p.left, q.left) && helper(p.right, q.right);
  };

  return helper(p, q);
};

// 測試
(function () {
  console.log('Testing [isSameTree_Brute]...');

  console.log(
    isSameTree_Brute(
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      new TreeNode(1, new TreeNode(2), new TreeNode(3))
    ) === true
  );
  console.log(
    isSameTree_Brute(
      new TreeNode(1, new TreeNode(2), null),
      new TreeNode(1, null, new TreeNode(2))
    ) === false
  );

  console.log('Testing [isSameTree]...');

  console.log(
    isSameTree(
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      new TreeNode(1, new TreeNode(2), new TreeNode(3))
    ) === true
  );
  console.log(
    isSameTree(
      new TreeNode(1, new TreeNode(2), null),
      new TreeNode(1, null, new TreeNode(2))
    ) === false
  );

  /**
   * Write Some Testing here
   */

  console.log('All Testing Passed ✅');
})();
