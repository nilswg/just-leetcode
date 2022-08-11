// @ts-check

import { TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/symmetric-tree/

// 題目說明
// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
//
//                  1
//               /  |  \
//              2   |   2
//             / \  |  / \
//            3  4  |  4  3

// 解題重點
// 1.瞭解二元樹的走訪
// 2.瞭解如何使用 DFS、BFS
// 3.此題可以參考 p0100，為此題的變體。

// 解題思路
// 與isSameTree概念相似，差別於鏡像所以 p.left === q.right 且 p.right === q.left

// 使用 BFS
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetricBFS = function (root) {
  let queue = [];
  queue.push([root.left, root.right]);

  while (queue.length > 0) {
    const [p, q] = queue.pop();

    if (!p && !q) continue;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    queue.push([p.left, q.right]);
    queue.push([p.right, q.left]);
  }
  return true;
};

// 使用 DFS
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const helper = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return helper(p.left, q.right) && helper(p.right, q.left);
  };
  return helper(root.left, root.right);
};

// 測試
(function () {
  console.log('Testing [isSymmetricBFS]...');

  console.log(
    isSymmetricBFS(
      new TreeNode(
        1,
        new TreeNode(2, new TreeNode(3), new TreeNode(4)),
        new TreeNode(2, new TreeNode(4), new TreeNode(3))
      )
    ) === true
  );
  console.log(
    isSymmetricBFS(
      new TreeNode(
        1,
        new TreeNode(2, null, new TreeNode(3)),
        new TreeNode(2, null, new TreeNode(3))
      )
    ) === false
  );

  console.log('Testing [isSymmetricDFS]...');

  console.log(
    isSymmetric(
      new TreeNode(
        1,
        new TreeNode(2, new TreeNode(3), new TreeNode(4)),
        new TreeNode(2, new TreeNode(4), new TreeNode(3))
      )
    ) === true
  );
  console.log(
    isSymmetric(
      new TreeNode(
        1,
        new TreeNode(2, null, new TreeNode(3)),
        new TreeNode(2, null, new TreeNode(3))
      )
    ) === false
  );

  console.log('All Testing Passed ✅');
})();
