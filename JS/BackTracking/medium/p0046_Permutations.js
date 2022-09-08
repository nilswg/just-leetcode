// @ts-check

// 題目鏈結
// https://leetcode.com/problems/permutations

// 題目說明
// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
//

// Example 1:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//

// Example 2:
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
//

// Example 3:
// Input: nums = [1]
// Output: [[1]]
//

// Constraints:
// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// All the integers of nums are unique.
//

// 解題重點
// 1. 瞭解BFS、DFS，並使用 BackTracking 窮舉所有排列組合。

// 解題思路
// 1. BFS、DFS 皆可窮舉出所有組合，實作並比較兩者作法上的差異。
// 2. 空間複雜度來看，BFS 為O(N!)；使用 DFS-BackTracking 能優化空間複雜度為 O(N)，DFS 為本題最佳解。

/**
 * Solution : 使用 BFS
 *
 * T = 0,
 *   [
 *     [[1, 2, 3], []]
 *   ];
 *
 * T = 1,
 *   [           [[2, 3], [1]],                    [[1, 3], [2]],                      [[1, 2], [3]],           ];
 *
 * T = 2,       /             \                   /              \                    /              \
 *   [
 *     [[3], [1, 2]],    [[2], [1, 3]],    [[3], [2, 1]],    [[1], [2, 3]],    [[2], [3, 1]],    [[1], [3, 2]],
 *   ];
 *
 * T = 3,      |               |                 |                |                  |                |
 *   [
 *     [[], [1, 2, 3]],  [[], [1, 3, 2]],  [[], [2, 1, 3]],  [[], [2, 3, 1]],  [[], [3, 1, 2]],  [[], [3, 2, 1]],
 *   ];
 *
 * ans =
 *    [    [1, 2, 3],      [1, 3, 2],        [2, 1, 3],       [2, 3, 1],         [3, 1, 2],       [3, 2, 1],    ];
 *
 * 
 * 時間複雜度分析
 * 總共需求 N 個元素進行排列，每次共有 N 個元素可供選擇，但是不可重複使用，故每次選擇 N 的總數便不斷遞減1。
 * 故需求 N* N-1* ... * 1, 即 N! 次，故時間複雜度為 O(N!)
 * 
 * 空間複雜度
 * 窮舉出的所有排列組合的數量，同樣為 O(N!)
 * 
 * BFS 複雜度
 * Time Complexity : O(N!) 
 * Space Complexity: O(N!)
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteBFS = (nums) => {
  if (nums.length <= 1) {
    return [nums]; // [[]] , [[x]]
  }

  let perms = [[nums, []]]; // 儲存所有排列組合。
  let ans = [];

  while (perms.length !== 0) {
    const newPerms = [];

    for (const perm of perms) {
      const [nums, res] = perm;

      if (nums.length === 0) {
        ans.push(res);
      }

      for (const num of nums) {
        const newNums = nums.filter((x) => x !== num);
        const newRes = [...res, num];
        newPerms.push([newNums, newRes]);
      }
    }

    perms = newPerms; //當nums.length為0時，會使perms為空。
  }

  return ans;
};

/**
 * Solution : 使用 DFS - BackTracking
 *
 * 使用BackTracking來實作
 *
 * DFS 解題思路
 * 1. 以DFS方式去搜尋，
 * 2. 逐層從 nums取出一個元素，放入 res中
 * 3. 最後當 nums.length為0時，再將 res放到ans中。
 * 4. 深度優先，每次走至底端，都能求出一種組合。
 * 5. 至底端就開始回溯並還原狀態，不需要保存多種 nums的狀態。
 *
 *                 nums:  [   1,   2,   3   ],  res: [ ]
 *             / ^                 | ^                   \ ^
 *            / /                  | |                    \ \
 *           / /                   | |                     \ \
 *          V /                    V |                      V \
 *     [2,3] | [1]            [1,3] | [2]              [1,2] | [3]
 *     / ^     \ ^             / ^     \ ^              / ^      \ ^
 *    V /       V \           V /       V \            V /        V \
 * [3]|[1,2]  [2]|[1,3]    [3]|[2,1]  [1]|[2,3]     [2]|[3,1]  [1]|[3,2]
 *    | ^        | ^         | ^        | ^           | ^        | ^
 *    v |        v |         v |        v |           v |        v |
 * []|[1,2,3] []|[1,3,2]   []|[2,1,3] []|[2,3,1]    []|[3,1,2] []|[3,2,1]
 *
 * ans : [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]
 *
 * 
 * 空間複雜度
 * 對比 BFS 會保存所有組合，DFS 每次走訪至底便可找出一組組合，故空間複雜度即其最大深度，即 O(N)
 * 
 * DFS 複雜度
 * Time Complexity : O(N!)
 * Space Complexity: O(N)
 *
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteDFS = function (nums) {
  const used = nums.map((x) => false);
  let ans = [];
  const dfs = (n, curr) => {
    if (n === 0) {
      ans.push([...curr]);
    }
    for (let i = 0, len = nums.length; i < len; i++) {
      if (used[i]) continue;
      used[i] = true;
      curr.push(nums[i]);
      dfs(n - 1, curr);
      curr.pop();
      used[i] = false;
    }
  };
  dfs(nums.length, []);
  return ans;
};

// 測試
(function () {
  /**
   *
   * @param {Array<any>} arr1
   * @param {Array<any>} arr2
   */
  const isArrayEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0, n = arr1.length; i < n; i++) {
      if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
        if (!isArrayEqual(arr1[i], arr2[i])) {
          return false;
        }
      } else {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
    }

    return true;
  };

  console.log('Testing [permuteDFS]...');
  console.log(
    isArrayEqual(permuteDFS([1, 2, 3]), [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  );
  console.log(
    isArrayEqual(permuteDFS([0, 1]), [
      [0, 1],
      [1, 0],
    ])
  );
  console.log(isArrayEqual(permuteDFS([1]), [[1]]));

  console.log('Testing [permuteBFS]...');
  console.log(
    isArrayEqual(permuteBFS([1, 2, 3]), [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  );
  console.log(
    isArrayEqual(permuteBFS([0, 1]), [
      [0, 1],
      [1, 0],
    ])
  );
  console.log(isArrayEqual(permuteBFS([1]), [[1]]));

  console.log('All Testing Passed ✅');
})();

/**
 * Write some code here!
 */

// 測試
(function () {
  console.log('Testing [p0046_permutations]...');

  // const testingWith = (cb) => {
  //   console.log(`Testing ${cb.name}`);
  //
  // }

  /**
   * Write Some Testing here
   */

  console.log('All Testing Passed ✅');
})();
