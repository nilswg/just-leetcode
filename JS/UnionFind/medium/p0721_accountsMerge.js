// @ts-check

import { isArrayEqual } from '../../BackTracking/backTracking.js';

// 題目鏈結
// https://leetcode.com/problems/accounts-merge

// 題目說明
// Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.
// Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.
// After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.
//

// Example 1:
// Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Explanation:
// The first and second John's are the same person as they have the common email "johnsmith@mail.com".
// The third John and Mary are different people as none of their email addresses are used by other accounts.
// We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'],
// ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
//

// Example 2:
// Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
// Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
//

// Constraints:
// 1 <= accounts.length <= 1000
// 2 <= accounts[i].length <= 10
// 1 <= accounts[i][j] <= 30
// accounts[i][0] consists of English letters.
// accounts[i][j] (for j > 0) is a valid email.
//

// 解題重點
// 1. 瞭解 Graph 實作相鄰表(Adjacency List)，再使用 DFS 走訪
// 2. 瞭解並查集(Disjoint Set Union)概念，並實作相鄰節點表

// 解題思路
// 1. 使用者名稱是可以重覆的，使用者一定僅有一名稱；email 則一定唯一，且必屬於唯一使用者。
// 2. 單純以Graph + DFS解題，在實作相鄰表(Adjacency List)需要多一點巧思。
// 3. 透過並查集(Disjoint Set Union)概念實作。

/**
 * Solution : 純粹使用Graph (建立adjlist 還是有用到並查集的概念)
 *
 * 單純以 Graph 基本認知來實作此題是足夠的，但是實作adjList時，其中概念
 * 即是使用"並查集"。 任一筆 account 資料 :
 *
 * e.g : ['David', 'David0@m.co', 'David1@m.co']
 *
 * [0] : 使用者名稱。
 * [1..n-1] : 為emails。
 *
 * 由於名稱可能是重覆的非唯一，我們先不考慮它。僅針對第 [1..n-1] emails 的部分來實作 adjList。
 * (0) 直接使用 email 來識別。
 * (1) 跳過第 1 個 email，
 * (2) 從第 2 個 email 開始，將其前一個元素作為它的 parent。i表示當前項，
 *     即:  graph.get(email[i - 1]).push(email[i]);
 *          graph.get(email[i]).push(email[i - 1]);
 *
 *
 * accounts
 * -----------------------------------------------------------------
 *  0: ['David', 'David0@m.co', 'David1@m.co']
 *  1: ['David', 'David3@m.co', 'David4@m.co']
 *  2: ['David', 'David4@m.co', 'David5@m.co']
 *  3: ['David', 'David2@m.co', 'David3@m.co']
 *  4: ['David', 'David1@m.co', 'David2@m.co']
 *
 * 將 accounts 轉換成 graph(adjList)
 *
 * emails map (emails)      | connectinons to other emails
 * -----------------------------------------------------------------
 *  'David0@m.co',           | ['David1@m.co']
 *  'David1@m.co'            | ['David0@m.co', 'David2@m.co']
 *  'David3@m.co'            | ['David4@m.co', 'David2@m.co']
 *  'David4@m.co'            | ['David3@m.co', 'David5@m.co']
 *  'David5@m.co'            | ['David4@m.co']
 *  'David2@m.co'            | ['David3@m.co', 'David1@m.co']
 *
 * 再透過 dfs 去走訪 graph 彙總成 res 表輸出。
 *
 * dfs find 'David0@m.co'
 *  -> ['David1@m.co'] // ['David1@m.co']
 *       -> 'David0@m.co' (seen)
 *       -> 'David2@m.co' // ['David1@m.co', 'David2@m.co']
 *           -> 'David3@m.co'  // ['David1@m.co', 'David2@m.co', 'David3@m.co']
 *               -> 'David4@m.co'  // ['David1@m.co', 'David2@m.co', 'David3@m.co', 'David4@m.co']
 *                   -> 'David3@m.co' (seen)
 *                   -> 'David5@m.co' // ['David1@m.co', 'David2@m.co', 'David3@m.co', 'David4@m.co', 'David5@m.co']
 *                       -> 'David4@m.co' (seen)
 *               -> 'David2@m.co' (seen)
 *           -> 'David1@m.co' (seen)
 *
 * tmp: ['David1@m.co', 'David2@m.co', 'David3@m.co', 'David4@m.co', 'David5@m.co']
 *
 * 時間複雜度分析
 * m: acounts的數量；n: accounts 的最大數量(含username和emails)。
 * 最糟的狀況時，最大的 email 的數量為 mn (相當於同一個人擁有所有的email)
 * 若用 N 表達 mn，即 O(mn) ≒ O(N)。
 * 
 * (1) 實作每個email與其他email間的相鄰表，時間複雜度為 O(mn) ≒ O(N)。
 * (2) 使用 dfs 去走訪相鄰表，找出不同使用者其所對應的 emails，重覆的紀錄會跳過，時間複雜度為 O(n)。
 * (3) 經由 dfs 搜尋出來的 emails 還要經過排序即 O(mnlogmn) ≒ O(NlogN)  
 * 
 * 總體來看，取 O(NlogN)。
 *
 * 空間複雜度分析
 * 即所有email 的相鄰關係數量，最糟情況下，n個點下，每個點又相連到其他點(不含自己)，
 * 即 n*(n-1) -> O(n²)
 *
 * 複雜度
 * Time Complexity : O(mnlogmn) ≒ O(NlogN)   // m 為 accounts 數量；n 為 emails 數量
 * Space Complexity: O(n²)                    // n 為 emails 數量
 *
 *
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const graph = new Map(); 
  const emails = [];
  const res = [];

  // T: O(mn) ≒ O(N)
  // S: O(n²)
  for (let i = 0, m = accounts.length; i < m; i++) {
    const items = accounts[i];
    const username = items[0];

    // items[1..n]: emails；items[0]: 使用者名稱
    // 建立 graph 使用到併查集的概念。
    // 每次均以前一個形成無向循環圖，所以我們從 j=1 開始，
    // 若email僅有一個，則不會產生關係。 e.g: '1' <=> '2'
    for (let j = 1, n = items.length; j < n; j++) {
      const email = items[j];
      // add to email and username.
      emails.push([email, username]);
      if (!graph.has(email)) {
        graph.set(email, []);
      }
      if (j === 1) continue;
      const pre = items[j - 1];
      graph.get(pre).push(email);
      graph.get(email).push(pre);
    }
  }

  // T: O(mn) ≒ O(N)
  const dfs = (email, tmp) => {
    const emails = graph.get(email);
    graph.delete(email); // 看過就拿掉
    for (const e of emails) {
      if (!graph.has(e)) continue;
      tmp.push(e);
      dfs(e, tmp);
    }
  };

  // T: O(mnlogmn)
  for (const [email, username] of emails) {
    if (!graph.has(email)) continue;
    let tmp = [email];
    dfs(email, tmp);
    tmp.sort();
    tmp.unshift(username);
    res.push(tmp);
  }

  return res;
};

/**
 * Solution: 使用 Disjoint Set Union
 *
 * 複雜度
 * Time Complexity : O(mnlogmn) ≒ O(NlogN)   // m 為 accounts 數量；n 為 emails 數量
 * Space Complexity: O(n²)                    // n 為 emails 數量
 *
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMergeUnionFind = function (accounts) {
  const acc = accounts;
  const par = acc.map((_, i) => i);
  // const rank = acc.map(() => 1);

  // T: 平均來看為 O(1)
  function find(x) {
    if (par[x] === x) {
      return x;
    }
    par[x] = find(par[x]); // find的過程中會不斷優化
    return par[x];
  }

  // T: 平均來看為 O(1)
  function union(x, y) {
    // x: curr, y: prev
    let par_x = find(x); //find parent_y
    let par_y = find(y); //find parent_x

    // 此題不需要考慮rank部分，可以精簡如下:
    // if (par_x !== par_y) {
    //   if (rank[par_x] > rank[par_y]) {
    //     par[par_y] = par_x;
    //     rank[par_x] += rank[par_y];
    //   } else {
    //     par[par_x] = par_y; // let the current one's parent to be the previous's.
    //     rank[par_y] += rank[par_x];
    //   }
    // }
    par[par_y] = par_x;
  }

  // T: O(mn)
  let email_map = new Map();
  for (let i = 0; i < accounts.length; i++) {
    const emails = acc[i];
    for (let j = 1; j < emails.length; j++) {
      const email = emails[j];
      if (email_map.has(email)) {
        union(i, email_map.get(email));
      } else {
        email_map.set(email, i);
      }
    }
  }

  // T: O(mn)
  let gr_map = new Map();
  for (let i = 0; i < par.length; i++) {
    const gr = find(par[i]);
    if (!gr_map.has(gr)) {
      gr_map.set(gr, new Set()); // 因為email作為key會重覆輸入
    }
    const set = gr_map.get(gr);
    const emails = acc[i];
    for (let j = 1; j < emails.length; j++) {
      set.add(emails[j]);
    }
  }

  // T: O(mnlogmn)
  let result = [];
  for (let [key, set] of gr_map) {
    let t_arr = Array.from(set);
    t_arr.sort();
    result.push([acc[key][0], ...t_arr]);
  }
  return result;
};

// 測試
(function () {
  console.log('Testing [p0721_accountsMerge]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);

    console.log(
      isArrayEqual(
        cb([
          ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
          ['John', 'johnsmith@mail.com', 'john00@mail.com'],
          ['Mary', 'mary@mail.com'],
          ['John', 'johnnybravo@mail.com'],
        ]),

        [
          [
            'John',
            'john00@mail.com',
            'john_newyork@mail.com',
            'johnsmith@mail.com',
          ],
          ['Mary', 'mary@mail.com'],
          ['John', 'johnnybravo@mail.com'],
        ]
      )
    );

    console.log(
      isArrayEqual(
        cb([
          ['Gabe', 'Gabe0@m.co', 'Gabe3@m.co', 'Gabe1@m.co'],
          ['Kevin', 'Kevin3@m.co', 'Kevin5@m.co', 'Kevin0@m.co'],
          ['Ethan', 'Ethan5@m.co', 'Ethan4@m.co', 'Ethan0@m.co'],
          ['Hanzo', 'Hanzo3@m.co', 'Hanzo1@m.co', 'Hanzo0@m.co'],
          ['Fern', 'Fern5@m.co', 'Fern1@m.co', 'Fern0@m.co'],
        ]),

        [
          ['Ethan', 'Ethan0@m.co', 'Ethan4@m.co', 'Ethan5@m.co'],
          ['Gabe', 'Gabe0@m.co', 'Gabe1@m.co', 'Gabe3@m.co'],
          ['Hanzo', 'Hanzo0@m.co', 'Hanzo1@m.co', 'Hanzo3@m.co'],
          ['Kevin', 'Kevin0@m.co', 'Kevin3@m.co', 'Kevin5@m.co'],
          ['Fern', 'Fern0@m.co', 'Fern1@m.co', 'Fern5@m.co'],
        ]
      )
    );

    console.log(
      isArrayEqual(
        cb([
          ['David', 'David0@m.co', 'David1@m.co'],
          ['David', 'David3@m.co', 'David4@m.co'],
          ['David', 'David4@m.co', 'David5@m.co'],
          ['David', 'David2@m.co', 'David3@m.co'],
          ['David', 'David1@m.co', 'David2@m.co'],
        ]),
        [
          [
            'David',
            'David0@m.co',
            'David1@m.co',
            'David2@m.co',
            'David3@m.co',
            'David4@m.co',
            'David5@m.co',
          ],
        ]
      )
    );
  };

  testingWith(accountsMerge);
  testingWith(accountsMergeUnionFind);

  console.log('All Testing Passed ✅');
})();

// console.log(graph)
// const dfs = (email, tmp) => {
//     const elements = graph.get(email);
//     graph.delete(email);
//     for (const e of elements){
//         if (!graph.has(e)) continue;
//         // seen.set(e, true);
//         tmp.push(e);
//         dfs(e, tmp);
//     }

// }
// for (const [email, username] of emails) {
//     if (!graph.has(email)) continue;
//     // seen.set(email, true);
//     let tmp = [email];
//     dfs(email, tmp);
//     tmp.sort();
//     tmp.unshift(username);
//     res.push(tmp);
// }
