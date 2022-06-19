// @ts-check
import { isSameTree, TreeNode } from '../binaryTree.js';

// 題目鏈結

// 題目說明
// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.//
//
// Example 1:
// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
//
//              0
//             / \
//           -3   9
//           /   /
//        -10   5

// 解題重點
// 1. 二分搜尋 + Recursion::Divide&Conquer
// 2. [m, m] => 根節點； [l, m-1] => 左子樹 :  [m+1, r] => 右子樹。
// 3. 返回終止條件: (l > r) 時。

// 解題思路
// [l, ..,  m-1, m, m+1, .., r]

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  let helper = (l, r) => {
    if (l > r) {
      return null;
    }
    let m = Math.floor((l + r) / 2);
    let root = new TreeNode(nums[m]);
    root.left = helper(l, m - 1);
    root.right = helper(m + 1, r);
    return root;
  };

  return helper(0, nums.length - 1);
};

// 測試
(function () {
  console.log('Testing [sortedArrayToBST]...');

  /**
   *  expect: [0,-10,5,null,-3,null,9]
   *
   *      0
   *    /   \
   *   -10   5
   *     \    \
   *     -3    9
   */
  const expect1 = new TreeNode(
    0,
    new TreeNode(-10, null, new TreeNode(-3)),
    new TreeNode(5, null, new TreeNode(9))
  );
  // console.log(expect1)
  // console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));
  console.log(
    isSameTree(sortedArrayToBST([-10, -3, 0, 5, 9]), expect1) === true
  );

  /**
   *  expect: [1,null,3]
   *
   *    1
   *     \
   *      3
   */
  const expect2 = new TreeNode(1, null, new TreeNode(3));
  // console.log(expect2)
  // console.log(sortedArrayToBST([1,3]));
  console.log(isSameTree(sortedArrayToBST([1, 3]), expect2) === true);
  console.log('All Testing Passed ✅');
})();
