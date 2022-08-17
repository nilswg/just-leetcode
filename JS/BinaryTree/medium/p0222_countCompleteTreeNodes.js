// @ts-check

import { buildTreeNodes, TreeNode } from "../binaryTree.js";

// 題目鏈結
// https://leetcode.com/problems/count-complete-tree-nodes

// 題目說明
// Given the root of a complete binary tree, return the number of the nodes in the tree.
// According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.
// Design an algorithm that runs in less than O(n) time complexity.
//

// Example 1:
// Input: root = [1,2,3,4,5,6]
// Output: 6
//

// Example 2:
// Input: root = []
// Output: 0
//

// Example 3:
// Input: root = [1]
// Output: 1
//

// Constraints:
// The number of nodes in the tree is in the range [0, 5 * 10^4].
// 0 <= Node.val <= 5 * 10^4
// The tree is guaranteed to be complete.
//

// 解題重點
// 1.先思考以DFS或BFS實作暴力法。
// 2.本題給出輸入的樹結構，必為"完整樹"，瞭解其特性再思考時間複雜度小於O(N)的解。
// 3.學習如何使用二分搜尋法於二元樹中進行查找。

// 解題思路
// 1.先嘗試以 DFS、BFS 實作暴力解，時間複雜度均為O(N)。
// 2.由於題目已給出提示，輸入的樹必為完整樹，基於完整樹的特性，可使用二分搜尋法來進行優化。
// 3.使用二分搜尋法實作的解，其結構為兩層，每層時間複雜度均為O(h), h為樹高(logN)，即 O(logN x logN) = O(log^2N)

// Solution : DFS 暴力解
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodesBrute = function (root) {
  let helper = (node) => {
    if (!node) return 0;
    return helper(node.left) + helper(node.right) + 1;
  };
  return helper(root);
};

/**
 * Solution : 基於完整樹的特性下，使用二元搜尋法。
 *
 * 1. 基於完整樹的特性，先以DFS實作getHeight方法，取得樹高(h)
 * 2. 當高度已知後，後續求解過程可拆解為 上、下半部:
 *    (1) 上半部數量確定為 :  Math.pow(2, h - 1) -1;
 *    (2) 下半部數量則介於 : [1, Math.pow(2, h - 1)];
 * 3. 承 2-(2):
 *    下半部求解可以視作兩層的回圈:
 *    (1) 第一層為二分搜尋，逐步找出最下層的最右節點(RightMost, RM)，取中點時，切記使用 "Math.ceil" 取 upperbound，
 *        原因是我們取剛好右子樹的第一節點作為參考點(m)，如此一來，該點存在則左子樹必定也都存在。
 *        (不建議 Math.floor 取 lowerbound 做參考點，如碰到 RM 剛好在最右側，形成全滿樹時，若while條件設置為(l<=r)時，會無法終止回圈)
 *    (2) 第二層回圈，也是一個二分搜尋，若想尋找的節點次序 idxToFind >= 時，表示(RM)在右側 [m, ed]； idxToFind < m 時，表示(RM)在左側 [st, m-1]。
 *    (3) 無論第一回圈或是第二層都使用相同方式取中點(m)或參考點(idxToFind)。 如: const m = Math.ceil((l + r) / 2);
 *    (4) 無論第一回圈或是第二層的起點(l)與終點(r)應完全一致。如:   let l = 0; let r = numOfUpperNodes;
 * 4. 最終返回 上、下數量加總即答案。
 *
 * 複雜度
 * Time Complexity : O(log^2N)
 * Space Complexity: O(1)，過程裡不需要額外儲存空間。
 *
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
  if (!root) return 0;

  const getHeight = (node) => {
    if (!node) return 0;
    return getHeight(node.left) + 1;
  };
  const h = getHeight(root);
  const numOfUpperNodes = Math.pow(2, h - 1) - 1;

  const isExist = (node, idxToFind) => {
    let l = 0;
    let r = numOfUpperNodes;
    for (let i = 0; i < h && l < r; i++) {
      const m = Math.ceil((l + r) / 2);
      if (idxToFind >= m) {
        node = node.right;
        l = m;
      } else {
        node = node.left;
        r = m - 1;
      }
    }

    return node !== null;
  };

  let l = 0;
  let r = numOfUpperNodes;
  while (l < r) {
    const m = Math.ceil((l + r) / 2);
    if (isExist(root, m)) {
      l = m;
    } else {
      r = m - 1;
    }
  }

  return numOfUpperNodes + l + 1;
};

// 測試
(function () {
  console.log("Testing [p0222_countCompleteTreeNodes]...");

  const testingWith = (cb) => {
    console.log(cb(buildTreeNodes([])) === 0);
    console.log(cb(buildTreeNodes([1, 2, 3, 4])) === 4);
    console.log(cb(buildTreeNodes([1, 2, 3, 4, 5])) === 5);
    console.log(cb(buildTreeNodes([1, 2, 3, 4, 5, 6])) === 6);
    console.log(cb(buildTreeNodes([1, 2, 3, 4, 5, 6, 7])) === 7);
    console.log(cb(buildTreeNodes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) === 10);
  };

  console.log("Testing [countNodesBrute]");
  testingWith(countNodesBrute);

  console.log("Testing [countNodes]");
  testingWith(countNodes);

  console.log("All Testing Passed ✅");
})();
