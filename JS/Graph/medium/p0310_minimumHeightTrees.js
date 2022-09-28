// @ts-check

// 題目鏈結
// https://leetcode.com/problems/minimum-height-trees

// 題目說明
// A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
// Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).
// Return a list of all MHTs' root labels. You can return the answer in any order.
// The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.
//

// Example 1:
// Input: n = 4, edges = [[1,0],[1,2],[1,3]]
// Output: [1]
// Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
//

// Example 2:
// Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
// Output: [3,4]
//

// Constraints:
// 1 <= n <= 2 * 10⁴
// edges.length == n - 1
// 0 <= ai, bi < n
// ai != bi
// All the pairs (ai, bi) are distinct.
// The given input is guaranteed to be a tree and there will be no repeated edges.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : 使用拓樸排序
 *
 * 假設樹中最長路徑為節點x到y, 表示成(x,y), 則本題需要求取的最小樹的根節點，一定存在於該最長路徑[x..y]中。
 *
 * 1. 此處 edges 為無方向性的，如[A,B] 視作雙向連接 A<->B
 * 2. 以前一次的狀態作為解答，若下次執行失敗(queue.length = 0)，則返回前一次的res。
 * 3. degree[i] 等於0時，代表路徑不存在或是已經被使用過，跳過該路徑。
 *
 * 複雜度
 * Time Complexity : O(??)
 * Space Complexity: O(??)
 *
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n <= 1) return [0];

  const degree = new Array(n).fill(0);
  const adj = degree.map(() => new Set());

  for (const [a, b] of edges) {
    // degree
    degree[a] += 1;
    degree[b] += 1;
    // adj
    adj[a].add(b);
    adj[b].add(a);
  }

  let res = [];
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      queue.push(i);
      degree[i] -= 1;
    }
  }

  while (queue.length > 0) {
    res = [];
    for (let i = 0, qlen = queue.length; i < qlen; i++) {
      const cur = queue.shift();
      const neighbors = Array.from(adj[cur]);
      res.push(cur); // 儲存當前狀態。
      for (const nb of neighbors) {
        if (degree[nb] < 1) continue; // 代表路徑不存在或是已經被使用過。
        degree[nb] -= 1;
        if (degree[nb] === 1) {
          queue.push(nb);
        }
      }
    }
  }
  return res;
};
// 測試
(function () {
  console.log('Testing [p0310_minimumHeightTrees]...');

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isEqual(cb(1, []), [0]));
    console.log(isEqual(cb(2, [[1, 0]]), [0, 1]));
    // 已經驗證Leetcode上無此特殊例外情況
    console.log(
      isEqual(
        cb(3, [
          [0, 1],
          [1, 0],
        ]),
        []
      )
    );
    console.log(
      isEqual(
        cb(3, [
          [0, 1],
          [1, 2],
        ]),
        [1]
      )
    );
    console.log(
      isEqual(
        cb(4, [
          [1, 0],
          [1, 2],
          [1, 3],
        ]),
        [1]
      )
    );
    console.log(
      isEqual(
        cb(6, [
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 4],
          [5, 4],
        ]),
        [3, 4]
      )
    );
  };

  testingWith(findMinHeightTrees);

  console.log('All Testing Passed ✅');
})();
