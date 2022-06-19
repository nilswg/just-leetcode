// @ts-check
import { isArrayEqual, Node } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/n-ary-tree-level-order-traversal/

// 題目說明
// Given an n-ary tree, return the level order traversal of its nodes' values.
// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).
//
//                   1
//                /  |  \
//               3   2   4
//              / \
//             5   6
//
// Input: root = [1,null,3,2,4,null,5,6]
// Output: [[1],[3,2,4],[5,6]]

// 解題重點
// 1. 瞭解Tree的LevelOrderTraversal，可先參考p0102
// 2. 此題為p102的變化題，當多個子節點時使用loop方式處理。

// 解題思路

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N) (額外使用quene來儲存)

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = [];
  if (!root) return res;
  let q = [root];
  let lt = 0;
  while (q.length > lt) {
    const level = [];
    for (let i = lt, n = q.length; i < n; i++) {
      const curr = q[i];
      level.push(curr.val);
      for (let child of curr.children) {
        if (child) q.push(child);
      }
      lt += 1;
    }
    res.push(level);
  }
  return res;
};
// 測試
(function () {
  console.log('Testing [p0429_NaryTreeLevelOrderTraversal]...');

  /**  q1:
   *          1
   *       /  |  \
   *      3   2   4
   *     / \
   *    5   6
   **/
  const q1 = new Node(1, [
    new Node(3, [
      new Node(5, []),
      new Node(6, [])
    ]),
    new Node(2, []),
    new Node(4, []),
  ]);

  console.log(isArrayEqual(levelOrder(q1), [[1],[3,2,4],[5,6]]));

  /** q2:
   *                    1
   *               /  /   \   \
   *              2   3    4   5
   *                 / \   |   | \
   *                6  7   8   9  10
   *                   |   |   |
   *                   11  12  13
   *                   |
   *                   14
   **/
  const q2 = new Node(1, [
    new Node(2, []),
    new Node(3, [
      new Node(6, []),
      new Node(7, [
        new Node(11, [
          new Node(14, []),
        ]),
      ]),
    ]),
    new Node(4, [
      new Node(8, [
        new Node(12, []),
      ]),
    ]),
    new Node(5, [
      new Node(9, [
        new Node(13, []),
      ]),
      new Node(10, []),
    ]),
  ]);

  console.log(isArrayEqual(levelOrder(q2), [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]));

  console.log('All Testing Passed ✅');
})();
