// @ts-check

import { TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/balanced-binary-tree/

// 題目說明
// Given a binary tree, determine if it is height-balanced.
//
// For this problem, a height-balanced binary tree is defined as:
//   a binary tree in which the left and right subtrees of every node differ in height by no more than 1.
/**
 * Example 1:
 *
 *     3
 *    / \
 *   9   20
 *      /  \
 *     15   7
 * Input: root = [3,9,20,null,null,15,7]
 * Output: true
 *
 * Example 2:
 *
 *             1
 *            / \
 *           2   2
 *          /\    \
 *         3  3
 *        /\
 *       4  4
 * Input: root = [1,2,2,3,3,null,null,4,4]
 * Output: false
 *
 * Example 3:
 *
 *
 *              1
 *             / \
 *            2   2
 *           /     \
 *          3       3
 *         /         \
 *        4           4
 *
 * Input: root = [1,2,2,3,null,null,3,4,null,null,4]
 * Output: false
 */

// 解題重點
// 1. 瞭解如何對BinaryTree以DFS方式走訪
// 2. 瞭解高度平衡樹(height-balanced)的特性:
//      (1) 當前節點，其左右子樹必為"平衡樹"
//      (2) 承1，其左右子樹高度差距不可超過1 (h<=1)。
//
// 3. 以 Divide&Conquer 來簡化問題，以DFS走訪各節點，並求出其左右子樹高度，再必較高度差是否符合條件。
// 4. 思考如何進一步優化，將重複計算的部分優化
// 5. 優化上重點: 透過額外的變數、旗標，紀錄當前結點，其左右子樹的狀態。

// 解題思路
// 1. 以 Divide&Conquer 來簡化問題，以DFS走訪各節點，並求出其左右子樹高度，再必較高度差是否符合條件。
//      (1) 實作 getHeight 方法: 給予節點，DFS走訪左右子樹，取最大高度。
//      (2) 實作 isBalanced 方法: 節點必滿足:
//
//          " isBalanced(node.left) && isBalanced(node.right) && abs( getHeight(node.left) - getHeight(node.right) ) <= 1 "
//
// 2. 思考如何進一步優化，將重複計算的部分優化
// 3. 優化上重點: 透過額外的變數、旗標，紀錄當前結點，其左右子樹的狀態。

/**
 * Solution1: Divide&Conquer + DFS
 *
 * 複雜度
 * Time Complexity : O(NlogN)
 * Space Complexity: O(log^2N)
 *
 * 複雜度分析
 *
 * getHeight 的複雜度
 * > Time Complexity : O(N), 要遍歷所有節點
 * > Space Complexity: O(logN), 即樹的高度
 *
 * isBalanced 的複雜度
 * > Time Complexity :
 * > 採用 Divide&Conquer 來實作，逐層拆解成:
 *     "根節點(root) + 左子樹(root.left) + 右子樹(root.right)"
 * > 最後，再將所有運算加總起來。
 *      root
 *    /     \
 *  [...]  [...]
 *
 * (以下計算，用 H 表示 getHeight 的複雜度)
 * > O( H ) + 2*( H/2 ) + 4*( H/4 ) + ...
 * > O(H)   + O(H)      + O(H)      + ... (不斷加O(H),共logN個)
 * > O(logN*H)
 *
 * > Time Complexity,  H = O(N) (getHeight時間複雜度)
 * > O(NlogN)
 *
 * > Space Complexity, H = O(logN) (getHeight空間複雜度)
 * > O((logN)^2)  logN的平方
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalancedBrute = function (root) {
  let getHeight = (node, h = 0) => {
    if (!node) return h;
    let lh = getHeight(node.left, h + 1);
    let rh = getHeight(node.right, h + 1);
    return Math.max(lh, rh);
  };

  let isBalanced = (node) => {
    if (!node) return true;
    let lh = getHeight(node.left);
    let rh = getHeight(node.right);
    return (
      Math.abs(lh - rh) <= 1 && isBalanced(node.left) && isBalanced(node.right)
    );
  };

  return isBalanced(root);
};

/**
 * Solution2: One-Time DFS Solution (只用一次DFS走訪)
 *
 * 在求解高度的同時，也驗證是否為平衡樹。
 * 作法上可透過額外的旗標(res) 去實現: 初始為true；若過程中發現任一節點不滿足，將其設置為 false。
 * 如此一來，驗證平衡樹的複雜度，可以簡化為一次對求取根節點高度的複雜度。即 O(N)。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(logN)*
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalancedDFS = function (root) {
  let res = true;
  let helper = (node, h = 0) => {
    if (!node) return h;
    let lt = helper(node.left, h + 1);
    let rt = helper(node.right, h + 1);

    if (Math.abs(lt - rt) > 1) {
      res = false;
    }

    return Math.max(lt, rt);
  };

  helper(root);
  return res;
};

/**
 * Solution2 再次優化後的最佳解
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(logN)
 *
 * 不使用額外的旗標，而是透過返回的高度判斷
 * -1  : 表示 non height-balanced
 * >=0 : 表示高度。
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  let getHeight = (node, h = 0) => {
    if (!node) return h;
    let lt = getHeight(node.left, h + 1);
    let rt = getHeight(node.right, h + 1);

    // 檢查左右子樹是否皆為height-balanced，若 <0 表示其下層子樹已為 non height-balanced，則直接返回 -1，向上傳遞此訊息。
    if (lt < 0 || rt < 0) {
      return -1;
    }

    // 若左右子樹皆為height-balanced，但高度差距大於1，則當前節點則為 non height-balanced，返回 -1 示之。
    if (Math.abs(lt - rt) > 1) {
      return -1;
    }

    return Math.max(lt, rt);
  };

  // 假如高度 >-1 則表示為 height-balanced
  return getHeight(root) > -1;
};

// 測試
(function () {
  console.log('Testing [p0110_BalancedBinaryTree]...');

  const testingWith = (isBalancedFn) => {
    let t1 = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );

    console.log(isBalancedFn(t1) === true);

    let t2 = new TreeNode(
      1,
      new TreeNode(
        2,
        new TreeNode(3, new TreeNode(4), new TreeNode(4)),
        new TreeNode(3)
      ),
      new TreeNode(2)
    );

    console.log(isBalancedFn(t2) === false);

    let t3 = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(3, new TreeNode(4))),
      new TreeNode(2, new TreeNode(3, new TreeNode(4)))
    );
    console.log(isBalancedFn(t3) === false);

    let t4 = new TreeNode(null);
    console.log(isBalancedFn(t4) === true);

    let t5 = null; // []
    console.log(isBalancedFn(t5) === true);
  };

  console.log('Testing [isBalancedBrute]');
  testingWith(isBalancedBrute);

  console.log('Testing [isBalancedDFS]');
  testingWith(isBalancedDFS);

  console.log('Testing [isBalanced]');
  testingWith(isBalanced);

  console.log('All Testing Passed ✅');
})();
