// @ts-check

import { TreeNode, isSameTree } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/invert-binary-tree/

// 題目說明
// Given the root of a binary tree, invert the tree, and return its root.

// Example 1:
//
//            4                       4
//           / \          =>         / \
//          2   7                   7   2
//         / \ / \                 / \ / \
//        1  3 6  9               9  6 3  1

// 解題重點
// 1. 了解二元數特性與走訪。
// 2. 左右子樹節點交換，且交換前記得要保存先前樹的狀態。
// 3. 交換完後必須返回該子樹才能逐層合併。 此題可用 divide&conquer 思路說明，
//    將整棵樹的逐層拆解為左右兩邊，最後逐層返回，合併結果後成為一顆完整的樹。

// 解題思路
/**
 *     4                  4
 *      \                /
 *       7      =>      7
 *        \            /
 *         9          9
 *
 *     4                  4
 *      \                /
 *       7      =>      7
 *      / \            / \
 *      6  9          9  6
 *
 *      4                  4
 *       \                /
 *   2    7      =>      7    2
 *    \  / \            / \  /
 *    3  6  9          9  6  3
 *
 *      4                  4
 *     /  \               / \
 *    2    7     =>      7   2
 *   / \  / \           / \  / \
 *  1  3  6  9         9  6  3  1
 */

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTreeHelper = function (root) {
  let helper = (node) => {
    if (!node) return null;
    let lt = helper(node.left);
    let rt = helper(node.right);
    node.left = rt;
    node.right = lt;
    return node; // <= 關鍵在此，要將此交換過的TreeNode 再次返回
  };
  return helper(root);
};

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

/**
 * 更精簡的寫法
 */
var invertTree = function (root) {
  if (!root) return null;
  let lt = invertTree(root.left);
  let rt = invertTree(root.right);
  root.left = rt;
  root.right = lt;
  return root;
};

// 測試
(function () {
  console.log('Testing [p0226_invertTree]...');

  const testingWith = (invertedTreeFn) => {
    const t1 = new TreeNode(
      4,
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      new TreeNode(7, new TreeNode(6), new TreeNode(9))
    );

    const inverted_t1 = new TreeNode(
      4,
      new TreeNode(7, new TreeNode(9), new TreeNode(6)),
      new TreeNode(2, new TreeNode(3), new TreeNode(1))
    );

    console.log(isSameTree(invertedTreeFn(t1), inverted_t1));
  };

  console.log('Testing [invertTreeHelper]');
  testingWith(invertTreeHelper);

  console.log('Testing [invertTree]');
  testingWith(invertTree);

  console.log('All Testing Passed ✅');
})();
