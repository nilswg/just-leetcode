// @ts-check

import { buildTreeNodes, isSameTree, TreeNode } from '../binaryTree.js';

// 題目鏈結
// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal

// 題目說明
// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
//

// Example 1:
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
//

// Example 2:
// Input: preorder = [-1], inorder = [-1]
// Output: [-1]
//

// Constraints:
// 1 <= preorder.length <= 3000
// inorder.length == preorder.length
// -3000 <= preorder[i], inorder[i] <= 3000
// preorder and inorder consist of unique values.
// Each value of inorder also appears in preorder.
// preorder is guaranteed to be the preorder traversal of the tree.
// inorder is guaranteed to be the inorder traversal of the tree.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution :
 *
 *  e.g   preorder = [3,9,20,15,7]
 *        inorder  = [9,3,15,20,7]
 *
 *           3
 *          / \
 *         9  20
 *            / \
 *           15  7
 *
 *
 * 1. preorder[pl] : 當前根值(val)
 * 2. val 透過inorder_map查找，取得位址 im = 1
 *
 * 3.  [ 根節點, [左子樹前序搜尋結果], [右子樹前序搜尋結果] ]
 *       pl                    pm                    pr
 *
 *     [ [左子樹中序搜尋結果], 根節點, [右子樹中序搜尋結果] ]
 *       il                    im                    ir
 *
 * preorder = [3, 9, 20, 15, 7]      inorder  = [9, 3, 15, 20, 7]
 *             pl            pr                  il            ir
 *
 * im 是當前節點於 inorder 中的位址，其左右子樹在其兩側。透過 preorder[pl] 於 inorder_map 查找。
 * => im = inorder_map.get(preorder[pl])
 *
 * pm 是下一次左子樹的右底端位址，透過當前 preorder 左邊界(pl)位址，加上左子樹的長度(im-il)
 * => pm = pl + (im - il)
 *
 * 左子樹: [pl + 1, pm ] [il, im - 1]
 * 右子樹: [pm + 1, pr ] [im + 1, ir]
 *
 * 複雜度
 * Time Complexity : O(n)  // n 為 preorder 和 inorder 長度，且兩者長度一致。
 * Space Complexity: O(n)  // 消耗額外的 inorder_map 查找 im 位址
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return;
  if (preorder.length !== inorder.length) return;

  const n = preorder.length;

  const inorder_mp = new Map();
  for (let i = 0; i < n; i++) {
    inorder_mp.set(inorder[i], i);
  }

  const helper = (pl, pr, il, ir) => {
    if (pl > pr || il > ir) return null;
    const val = preorder[pl];
    const root = new TreeNode(val);
    const im = inorder_mp.get(val);
    const pm = pl + (im - il);
    root.left = helper(pl + 1, pm, il, im - 1);
    root.right = helper(pm + 1, pr, im + 1, ir);
    return root;
  };

  return helper(0, n - 1, 0, n - 1);
};

/**
 * Solution : 使用 DFS 方式建立樹
 * 
 * 分別使用兩個指標 i, p 分別作為 inorder 與 preorder 中的位址。
 * 走訪的順序採前序搜尋，從左側開始，每經過一個節點就會紀錄其值。
 * 而中序搜尋則是會一值到最左側最底的元素後，才開始紀錄位址，並開始返回。
 * 
 * i, p 初始皆為 0，以前序方式走訪，p 先移動(p+=1)，直到 inorder[i] 和 preorder[p] 一樣時，
 * 這時將發生折返，因為左側已經沒有任何元素，需要返回 null。可觀察下面的例子中:
 * 
 *                3
 *               / \
 *  (折返點)=> (9)  20
 *                 / \
 *                15  7
 *  
 * 前序搜尋時，直到 9 為止，由於 inorder[i] 和 preorder[p] 相等，必須折返。
 * 
 * 折返後，i 開始移動(i+=1)向一次要折返的位址。且因為向左已無元素，開始查找右側元素。
 * 當右邊也發生折返時，表示左右皆無元素，返回該子樹。
 * 
 * 由於建立樹的方式相當前序搜尋的完整執行一次。對比先前作法，過程不需要額外空間來查找，
 * dfs走訪需要棧空間，故考慮靠最壞情形，空間複雜度仍為 O(n)。
 * 
 * 複雜度
 * Time Complexity : O(n)  // n 為 preorder 和 inorder 長度，且兩者長度一致。
 * Space Complexity: O(n)  // n 為走訪的深度。
 */
var buildTreeOptimal = function (preorder, inorder) {
  let i = 0; // inorder_index 代表最左側的左子樹位址。
  let p = 0; // preorder_index
  var dfs = (node) => {
    // console.log('i',i, 'p',p, 'inorder', inorder[i], 'node',node??'x', 'preorder', preorder[p])
    if (inorder[i] !== node) {
      var root = new TreeNode(preorder[p]);
      // 先左到底
      p += 1;
      root.left = dfs(root.val);
      // 繼續向右
      i += 1;
      root.right = dfs(node);
      // 左右皆到底，返回該子樹
      return root;
    }
    // console.log('----null----')
    return null;
  };
  return dfs(undefined);
};

// 測試
(function () {
  console.log(
    'Testing [p0105_constructBinaryTreeFromPreorderAndInorderTraversal]...'
  );

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);

    //     preorder = [3,9,20,15,7],
    //     inorder  = [9,3,15,20,7]
    //         3
    //        / \
    //       9  20
    //      /\   /\
    //          15 7
    console.log(
      isSameTree(
        cb([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]),
        buildTreeNodes([3, 9, 20, null, null, 15, 7])
      )
    );

    //  preorder = [4,2,1,3,6,5,7]
    //  inorder  = [1,2,3,4,5,6,7]
    //
    //     4
    //    / \
    //   2   6
    //  / \  /\
    //  1 3  5 7
    console.log(
      isSameTree(
        cb([4, 2, 1, 3, 6, 5, 7], [1, 2, 3, 4, 5, 6, 7]),
        buildTreeNodes([4, 2, 6, 1, 3, 5, 7])
      )
    );

    //  preorder = [-1,2]
    //  inorder  = [-1,2]
    //
    //     -1
    //       \
    //        2
    console.log(
      isSameTree(cb([-1, 2], [-1, 2]), buildTreeNodes([-1, null, 2]))
    );

    //  preorder = [-1,2]
    //  inorder  = [2,-1]
    //
    //     -1
    //     /
    //    2
    console.log(isSameTree(cb([-1, 2], [2, -1]), buildTreeNodes([-1, 2])));

    //  preorder = [-1]
    //  inorder  = [-1]
    //
    //     -1
    //
    console.log(isSameTree(cb([-1], [-1]), buildTreeNodes([-1])));
  };

  testingWith(buildTree);
  testingWith(buildTreeOptimal);

  console.log('All Testing Passed ✅');
})();
