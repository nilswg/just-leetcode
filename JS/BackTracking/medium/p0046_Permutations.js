// @ts-check

// 題目鏈結
// https://leetcode.com/problems/permutations/

// 題目說明
// Given an array nums of distinct integers,
// return all the possible permutations. You can return the answer in any order.

// BFS 解題思路
// 1. BFS 算是本題的暴力解，
// 2. BFS 的步驟與DFS概念一致，差別在於將每層結果合併為一層，
// 3. 但是也會發現看似直接的思路，於本題來說實作起來並無簡化，且由於不斷複製nums，導致空間複雜度大增。
// 4. 換言之，需要找出所有組合與可能的題目，BFS 不會是最佳解。
//
// T = 0,
//   [
//     [[1, 2, 3], []]
//   ];
//
// T = 1,
//   [           [[2, 3], [1]],                    [[1, 3], [2]],                      [[1, 2], [3]],           ];
//
// T = 2,       /             \                   /              \                    /              \
//   [
//     [[3], [1, 2]],    [[2], [1, 3]],    [[3], [2, 1]],    [[1], [2, 3]],    [[2], [3, 1]],    [[1], [3, 2]],
//   ];
//
// T = 3,      |               |                 |                |                  |                |
//   [
//     [[], [1, 2, 3]],  [[], [1, 3, 2]],  [[], [2, 1, 3]],  [[], [2, 3, 1]],  [[], [3, 1, 2]],  [[], [3, 2, 1]],
//   ];
//
// ans =
//    [    [1, 2, 3],      [1, 3, 2],        [2, 1, 3],       [2, 3, 1],         [3, 1, 2],       [3, 2, 1],    ];
//
// BFS 複雜度
// Time Complexity : O(N!)
// Space Complexity: O(N!)
/**
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

    perms = newPerms;//當nums.length為0時，會使perms為空。
  }

  return ans;
};

// 解題重點
// 瞭解DFS
// 使用BackTracking來實作

// DFS 解題思路
// 1. 以DFS方式去搜尋，
// 2. 逐層從 nums取出一個元素，放入 res中
// 3. 最後當 nums.length為0時，再將 res放到ans中。
// 4. 深度優先，每次走至底端，都能求出一種組合。
// 5. 至底端就開始回溯並還原狀態，不需要保存多種 nums的狀態。
//
//                 nums:  [   1,   2,   3   ],  res: [ ]
//             / ^                 | ^                   \ ^
//            / /                  | |                    \ \
//           / /                   | |                     \ \
//          V /                    V |                      V \
//     [2,3] | [1]            [1,3] | [2]              [1,2] | [3]
//     / ^     \ ^             / ^     \ ^              / ^      \ ^
//    V /       V \           V /       V \            V /        V \
// [3]|[1,2]  [2]|[1,3]    [3]|[2,1]  [1]|[2,3]     [2]|[3,1]  [1]|[3,2]
//    | ^        | ^         | ^        | ^           | ^        | ^
//    v |        v |         v |        v |           v |        v |
// []|[1,2,3] []|[1,3,2]   []|[2,1,3] []|[2,3,1]    []|[3,1,2] []|[3,2,1]
//
// ans : [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]
//
// DFS 複雜度
// Time Complexity : O(N!)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteDFS = function (nums) {
  if (nums.length <= 1) {
    return [nums]; // [[]] , [[x]]
  }
  const dfs = (nums, res, ans) => {
    if (!nums.length) {
      ans.push(res); // 將 res 新的排序加入 ans中
      return;
    }
    for (const num of nums) {
      // 留下一個除了 i 以外的集合。
      const newNums = nums.filter((x) => x !== num);
      // 將 num 加入排序中。
      const newRes = [...res, num];
      dfs(newNums, newRes, ans);
    }
    return ans;
  };
  return dfs(nums, [], []);
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
