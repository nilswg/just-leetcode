// @ts-check

import { Node } from "../graph.js";

// 題目鏈結
// https://leetcode.com/problems/clone-graph

// 題目說明
// Given a reference of a node in a connected undirected graph.
// Return a deep copy (clone) of the graph.
// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
//
// class Node {
//     public int val;
//     public List<Node> neighbors;
// }
//
// Test case format:
// For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
// "An adjacency list" is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.
//

// Example 1:
// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
//

// Example 2:
// Input: adjList = [[]]
// Output: [[]]
// Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
//

// Example 3:
// Input: adjList = []
// Output: []
// Explanation: This an empty graph, it does not have any nodes.
//

// Constraints:
// The number of nodes in the graph is in the range [0, 100].
// 1 <= Node.val <= 100
// Node.val is unique for each node.
// There are no repeated edges and no self-loops in the graph.
// The Graph is connected and all nodes can be visited starting from the given node.
//

// 解題重點
// 1. 瞭解深拷貝的意義
// 2. 瞭解圖的基本特性，以及使用BFS、DFS去走訪圖。

// 解題思路
// 1. 由於圖可能有環與無方向的特性，需使用雜湊表去紀錄走訪過的點(vertex)，避免重覆訪問造成無限循環。
// 2. 承1. 題目要求不單是走訪還要進行深拷貝，需要雜湊表紀錄來源與複製圖間，各節點的映射關係。
// 3. 以下分別使用BFS、DFS，在此題的作法上，DFS最佳。

/**
 * Solution : BFS
 *
 * e.g:  node: [[2,4],[1,3],[2,4],[1,3]]
 *
 *           1 - 2
 *   node =  |   |
 *           4 - 3
 *
 * T=0,      queue       curr: 1          mp
 *           [1]                          [ 1: 1' ]
 *            ^qi=0
 * --------------------------回圈開始--------------------------
 * T=1,      queue       curr: 2          mp
 *           [1,2,4]                        [ 1: 1', 2: 2' ]
 *              ^qi=1
 *
 * T=2,      queue       curr: 4          mp
 *           [1,2,4,3]                        [ 1: 1', 2: 2', 4: 4']
 *                ^qi=2
 *
 * T=3,      queue       curr: 3          mp
 *           [1,2,4,3]                          [ 1: 1', 2: 2', 4: 4', 3: 3']
 *                  ^qi=3
 *
 *           (最終返回 mp[node] 即是答案)
 *
 *
 * 空間複雜度上，需要 queue 和 HashMap，是 O(N) + O(N) = O(2N), 近似取 O(N)
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 *
 * @param {Node} node
 * @return {Node}
 */
var cloneGraphBFS = function (node) {
  if (!node) return node;

  let queue = [node];
  let qi = 0;

  let mp = new Map(); //存儲對應的副本
  mp.set(node, new Node(node.val, []));

  while (queue.length > qi) {
    const curr = queue[qi];
    const clone = mp.get(curr); //透過 map 取出相應的拷貝節點
    qi += 1;

    for (const nb of curr.neighbors) {
      if (!mp.has(nb)) {
        mp.set(nb, new Node(nb.val, []));
        queue.push(nb); //避免重覆走訪相同的點
      }
      clone.neighbors.push(mp.get(nb));
    }
  }

  return mp.get(node);
};

/**
 * Solution : DFS
 * 
 * 空間複雜度來看，僅有因使用DFS走訪時，產生新執行環境的stack長度，所以為 O(N)
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N) 
 *
 * @param {Node} node
 * @return {Node}
 */
var cloneGraphDFS = function (node) {
  if (!node) return node;

  let mp = new Map();

  let helper = (node) => {
    if (mp.has(node)) {
      return mp.get(node);
    }

    let clone = new Node(node.val);
    mp.set(node, clone);

    for (const nb of node.neighbors) {
      clone.neighbors.push(helper(nb));
    }
    return clone;
  };

  return helper(node);
};
/**
 * Write some code here!
 */

// 測試
(function () {
  console.log("Testing [p0133_cloneGraph]...");

  const buildGraph = (adjacencyList = []) => {
    if (!adjacencyList.length) return new Node(null); //給個空點

    const graph = {};

    adjacencyList.forEach((adj, i) => {
      const id = i + 1;
      if (!graph[id]) {
        graph[id] = new Node(id);
      }
      const node = graph[id];

      for (const id of adj) {
        if (!graph[id]) {
          graph[id] = new Node(id);
        }
        node.neighbors.push(graph[id]);
      }
    });

    return graph[1];
  };

  const isEqualGraph = (g1, g2) => {
    if (!g1 && !g2) return true;
    if (!g1 || !g2) return false;

    let seen = {};

    const dfs = (g1, g2, val) => {
      if (seen[val]) return true;
      if (g1 === g2) return false; //位址相等表示相同物件。
      if (g1.val !== g2.val) return false; //驗證值相等

      seen[val] = true;

      for (let i = 0, n = g1.neighbors.length; i < n; i++) {
        const nb1 = g1.neighbors[i];
        const nb2 = g2.neighbors[i];
        if (nb1.val !== nb2.val) return false;
        if (!dfs(nb1, nb2, nb1.val)) {
          return false;
        }
      }
      return true;
    };

    return dfs(g1, g2, 1);
  };

  const testingWith = (cb) => {
    let n1 = buildGraph([
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ]);
    console.log(isEqualGraph(n1, n1) === false); // 因為傳入相同物件，所以抱錯。
    console.log(isEqualGraph(cb(n1), n1));

    let n2 = buildGraph([[]]);
    console.log(isEqualGraph(n2, n2) === false); // 因為傳入相同物件，所以抱錯。
    console.log(isEqualGraph(cb(n2), n2));

    let n3 = buildGraph([]);
    console.log(isEqualGraph(n3, n3) === false); // 因為傳入相同物件，所以抱錯。
    console.log(isEqualGraph(cb(n3), n3));
  };

  console.log("Testing [cloneGraphBFS]...");
  testingWith(cloneGraphBFS);

  console.log("Testing [cloneGraphDFS]...");
  testingWith(cloneGraphDFS);

  console.log("All Testing Passed ✅");
})();
