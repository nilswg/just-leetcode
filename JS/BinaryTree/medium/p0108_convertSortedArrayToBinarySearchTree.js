// @ts-check

import {
  buildTreeNodes,
  isArrayEqual,
  isSameTree,
  TreeNode,
} from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree

// 題目說明
// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
//

// Example 1:
// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:
//

// Example 2:
// Input: nums = [1,3]
// Output: [3,1]
// Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
//

// Constraints:
// 1 <= nums.length <= 10⁴
// -10⁴ <= nums[i] <= 10⁴
// nums is sorted in a strictly increasing order.
//

// 解題重點
// 1. 透過排序過的序列轉換成二元樹

// 解題思路
// 1. 使用二分搜尋法的思路，每次從序列的中點為根，左右兩側為其子樹。

/**
 * Solution : 二分搜尋法的思路，每次從序列的中點為根，左右兩側為其子樹。
 *
 * 由於取中點時，使用 floor, 優先選擇左邊為根節點
 *
 * 複雜度
 * Time Complexity : O(n) // 樹節點的總數
 * Space Complexity: O(logN) // 即樹高
 */

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  const helper = (l, r) => {
    if (l > r) return null; // <=
    let m = Math.floor((l + r) / 2);
    let root = new TreeNode(nums[m]);
    root.left = helper(l, m - 1);
    root.right = helper(m + 1, r);
    return root;
  };

  return helper(0, nums.length - 1);
};

/**
 * Solution : 先較於前者，取中點時優先選右邊(ceil)
 *
 * 複雜度
 * Time Complexity : O(n) // 樹節點的總數
 * Space Complexity: O(logN) // 即樹高
 *
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBSTRightFirst = function (nums) {
  const helper = (l, r) => {
    if (l > r) return null; 
    let m = Math.ceil((l + r) / 2); // 使用 ceil 優先選右
    let root = new TreeNode(nums[m]);
    root.left = helper(l, m - 1);
    root.right = helper(m + 1, r);
    return root;
  };

  return helper(0, nums.length - 1);
};

// 測試
(function () {
  console.log('Testing [p0108_convertSortedArrayToBinarySearchTree]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);

    const isAccepted = (answer, expectedTrees) => {
      if (expectedTrees.length !== 2) return false;
      // 對於每個問題，其答案皆有兩種型式，以下一種成立即通過測試。
      const a = isSameTree(answer, buildTreeNodes(expectedTrees[0]));
      const b = isSameTree(answer, buildTreeNodes(expectedTrees[1]));
      return a || b;
    };

    /**
     * Example 1:
     *
     * Input:  nums = [-10,-3,0,5,9]
     * Output:
     *
     * 優先選擇左邊(floor)          |    優先選擇右邊(ceil)
     * [0,-10,5,null,-3,null,9]    |    0,-3,9,-10,null,5]
     *                             |
     *           0                 |                  0
     *          / \                |                 / \
     *        -10  5               |               -3   9
     *          \   \              |               /   /
     *          -3   9             |            -10   5
     */

    console.log(
      isAccepted(cb([-10, -3, 0, 5, 9]), [
        [0, -10, 5, null, -3, null, 9],
        [0, -3, 9, -10, null, 5],
      ])
    );

    /**
     * Example 2:
     * Input: nums = [1,3]
     * Output:
     *
     * 優先選擇左邊(floor)    |   優先選擇右邊(ceil)
     * [1,null,3]            |   [3,1]
     *                       |
     *        1              |              3
     *         \             |             /
     *          3            |            1
     */
    console.log(
      isAccepted(cb([1, 3]), [
        [1, null, 3],
        [3, 1],
      ])
    );
  };

  testingWith(sortedArrayToBST);
  testingWith(sortedArrayToBSTRightFirst);

  console.log('All Testing Passed ✅');
})();
