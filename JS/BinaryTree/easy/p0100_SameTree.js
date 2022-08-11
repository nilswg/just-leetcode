// @ts-check
import { TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/same-tree/

// 題目說明
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// 解題重點
// 1.瞭解二元樹的走訪
// 2.瞭解如何使用 DFS、BFS

// 解題思路
//
/**
 * 使用 BFS
 * 透過 queue 去逐層比對，但是這作法會需要額外的儲存空間
 *
 * 分析空間複雜度，對於一個節點數量為N 的二元樹，其高度為 logN，當我們逐層比較時，
 * 其quene須保存的最大數量，即最底層(第N層)的節點數量，亦是前第0至N-1層的總和，再扣1。
 * e.g :
 *
 *  a.節點數量為 8,
 *
 *        1
 *       / \
 *      2   3      第 1、2 層 : [1,2,3]，共3個
 *     /\   /\     .
 *    4 5  6  7    最下層: [4,5,6,7]，共4個
 *
 *  b.節點數量為 N
 *        1
 *       / \
 *      2   3
 *     /\   /\     第 1、2、n-1 層 : [1,2,3,...(n/2)]，共 n/2 -1 個
 *       ...       .
 *   /\ /\  /\ /\  第 n 層: [(n/2+1),...n]，共 n/2 個
 *
 *  因此,縱觀a,b來看，quene需保存的最大節點數量為 N/2, 空間複雜度為 O(logN)
 *
 */
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(logN)

var isSameTreeBFS = function (p, q) {
  let queue = [[p, q]];

  while (queue.length > 0) {
    const [p, q] = queue.pop();

    // 空點則跳過。 同 (p === null && q === null)
    if (!p && !q) continue;

    // 當 p 與 q 相異時，則返回 false
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    queue.push([p.left, q.left]);
    queue.push([p.right, q.right]);
  }
  return true;
};

// 最佳解: 使用 DFS
//
// 一邊走訪同時一邊進行比較，不需要額外的空間儲存，優化空間複雜度為O(logN) -> O(1)
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
    // 空點，表示走到底，返回true。
    if (!p && !q) return true;
    //  當 p 與 q 相異時，則返回 false
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    // 深度優先地向下走訪
    return helper(p.left, q.left) && helper(p.right, q.right);
  };
  return helper(p, q);
};

// 測試
(function () {
  console.log('Testing [isSameTreeBFS]...');

  console.log(
    isSameTreeBFS(
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      new TreeNode(1, new TreeNode(2), new TreeNode(3))
    ) === true
  );
  console.log(
    isSameTreeBFS(
      new TreeNode(1, new TreeNode(2), null),
      new TreeNode(1, null, new TreeNode(2))
    ) === false
  );

  console.log('Testing [isSameTreeDFS]...');

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

  console.log('All Testing Passed ✅');
})();
