# Binary Tree

<br>

### 複雜度
---

DFS 查找單一節點來看，
Time Complexity:  O(logN) // 因二分搜尋的特性，每次查找範圍會減半，
Space Complexity  O(1)    // 因二分搜尋的特性，每次查找時需關注某一分支，不需要額外空間。

DFS 走訪整棵樹來看
Time Complexity:  O(N)    // N 即是整棵樹節點的數量，因為每次走訪都取一個點進到下個遞迴。
Space Complextty: O(logN) // logN 即是整棵樹的高度，即是走訪時會產生context次數，即stack的大小。
                  O(N)    // N 我們常將走訪的結果儲存在額外的陣列中輸出，即該陣列的大小。

BFS 查找單一節點來看，
Time Complexity:  O(N)    // N 即是整棵樹節點的數量，層層查找，最糟需要走訪所有節點
Space Complexity  O(N)    // 需要額外的queue來儲存

BFS 走訪整棵樹來看
Time Complexity:  O(N)    // N 即是整棵樹節點的數量
Space Complexity  O(N)    // 需要額外的queue來儲存

重點:
1.在大部分對Tree的利用上，更傾向使用DFS來提升效率，在實作上他也相對BFS容易與簡單。
2.基於BFS是層層走訪，所以在表達樹的組成時最準確一致；
3.DFS得走訪涉及遞迴、Divide&Conquer ； BFS的走訪則涉及queue的使用。

### TreeNode
---

```js
// Definition for a binary tree node.
function TreeNode(val = 0, left = null, right = null) {}
```

### 樹的深度優先搜尋(Depth First Search, DFS)
---
- Preorder
- InOrder
- PostOrder

<br>

### [0144 Binary Tree Preorder Traversal]

---

Given the root of a binary tree, return the preorder traversal of its nodes' values.

```
Input: root = [1,null,2,3]
Output: [1,2,3]

(1)
  \
   (2)
  /
(3)
```

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (!root) return [];
  let list = [];

  var traverse = (node) => {
    if (!node) return;
    list.push(node.val);
    traverse(node.left);
    traverse(node.right);
  };

  traverse(root);
  return list;
};
```

### [0094 Binary Tree Inorder Traversal]

---

Given the root of a binary tree, return the inorder traversal of its nodes' values.

```
Input: root = [1,2]
Output: [2,1]

  (1)
  /
(2)
```

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  if (!root) return [];
  let list = [];

  let traverse = (node) => {
    if (!node) return;
    traverse(node.left);
    list.push(node.val);
    traverse(node.right);
  };

  traverse(root);
  return list;
};
```

### [0145 Binary Tree Postorder Traversal]

---

Given the root of a binary tree, return the postorder traversal of its nodes' values.

```
Input: root = [1,null,2,3]
Output: [3,2,1]

     (1)
       \
       (2)
       /
     (3)
```

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  if (!root) return [];
  let list = [];

  let traverse = (node) => {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    list.push(node.val);
  };

  traverse(root);
  return list;
};
```

[0144 binary tree preorder traversal]: (https://leetcode.com/problems/binary-tree-preorder-traversal/)
[0094 binary tree inorder traversal]: (https://leetcode.com/problems/binary-tree-inorder-traversal/)
[0145 binary tree postorder traversal]: (https://leetcode.com/problems/binary-tree-postorder-traversal/)


### 樹的廣度度優先搜尋 (Breath-Firsy Search, BFS)
- Levelorder: 透過 queue來實現。

### [0102 binary tree levelorder traversal]
---

```
        a
      /   \
     b     c
    / \     \
   d   e     f

Input: root = ['a', 'b', 'c', 'd', 'e', null, 'f'];
Output: ['a', 'b', 'c', 'd', 'e', 'f']
```

```js
var bfs = (root) => {
  let res = [];
  let queue = [root];

  while (queue.length > 0) {
    const curr = queue.shift();
    res.push(curr.val);
    if (curr.left !== null) {
      queue.push(curr.left);
    }
    if (curr.right !== null) {
      queue.push(curr.right);
    }
  }

  return res;
};

```

[0102 binary tree levelorder traversal]: (https://leetcode.com/problems/binary-tree-level-order-traversal/)
