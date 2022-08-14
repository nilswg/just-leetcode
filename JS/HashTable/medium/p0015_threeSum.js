// @ts-check

// 題目鏈結
// https://leetcode.com/problems/3sum

// 題目說明
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.
//

// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
//

// Example 2:
// Input: nums = []
// Output: []
//

// Example 3:
// Input: nums = [0]
// Output: []
//

// Constraints:
// 0 <= nums.length <= 3000
// -10^5 <= nums[i] <= 10^5
//

// 解題重點
// 1. 題目名稱與兩數之和相似，但作法事實有很大差距
// 2. 題目要求找到"所有"三數相加為零的組合，且組合不可重覆。
// 3. 瞭解雙指針來

// 解題思路
// 1. 題目要求找到"所有"三數相加為零的組合，且組合不可重覆。
//     e.g [-1, 2, -1] 與 [2, -1, -1] 雖然出現的位置不同，但是以組合來看使用到相同的元素，所以僅能視作一組。
//
// 2. 承1 來看, "去除重複"是重要其前提，所以我們先對數列進行排序，這樣一來，相同的元素會被集中在一起。
// 3. 比較三數之和前，也要檢查此次使用的元素組合，是否與前一次相同，若發生重複則直接跳到下一個。

/**
 * Solution :暴力解
 *
 * 暴力解，使用三重回圈，去列舉出所有可能組合。(nums[i] + nums[j] + nums[k] === 0)
 * 每層回圈開始前，與前一次比較，若相同，代表是重複的元素，則直接跳到一不同的元素。
 * 複雜度
 *
 * e.g: [-1,0,1,2,-1,-4]
 *
 *   after sort,
 *   --> [-4,-1,-1,0,1,2]
 *
 *   i, nums[i]   j, nums[j]   k, nums[k]                             res
 *   0, -4,       1, -1,       2, -1        => -4 + -1 + -1  != 0      []
 *   0, -4,       1, -1,       3,  0        => -4 + -1 +  0  != 0      []
 *   0, -4,       1, -1,       4,  1        => -4 + -1 +  1  != 0      []
 *   0, -4,       1, -1,       5,  2        => -4 + -1 +  2  != 0      []
 *   1, -1,       2, -1 (duplicate j++)                                []
 *   1, -1,       3,  0        4,  1        => -1 +  0 +  1  == 0      [[-1,0,1]]
 *   1, -1,       3,  0        5,  2        => -1 +  0 +  2  != 0      [[-1,0,1]]
 *   1, -1,       4,  1        5,  2        => -1 +  1 +  2  != 0      [[-1,0,1]]
 *   1, -1,       5( < n-1)                                            [[-1,0,1]]
 *   2, -1 (duplicate i++)                                             [[-1,0,1]]
 *   3,  0        4,  1        5,  2        => -1 +  1 +  2  == 0      [[-1,0,1], [-1,1,2]]
 *   4( < n-2)                                                         [[-1,0,1], [-1,1,2]]
 *
 * e.g: [0,0,0,0]
 *
 *   i, nums[i]   j, nums[j]   k, nums[k]                             res
 *   0,  0,       1,  0,       2,  0        => 0  +  0 +  0  == 0      [[0,0,0]]
 *   0,  0,       1,  0,       3(duplicate k++)
 *   0,  0,       1,  0,
 *
 * Time Complexity : O(N^3)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum_bruteforce = function (nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let res = [];
  //   i  j        k
  // [-4,-1,-1,0,1,2]

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 移除重複
    for (let j = i + 1; j < n - 1; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // 移除重複
      for (let k = j + 1; k < n; k++) {
        if (k > j + 1 && nums[k] === nums[k - 1]) continue; // 移除重複
        if (nums[i] + nums[j] + nums[k] === 0) {
          res.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }

  return res;
};

/**
 * Solution :HashTable
 *
 * 使用HashTable去存儲前兩位 i, j 的所有組合 (nums[i] + nums[j])
 * 因為當前兩位決定後，如何求出剩餘的數相當於先前提到的 twoSum 問題
 *
 * Time Complexity : O(N^2)
 * Space Complexity: O(N)
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSumHashTable = function (nums) {
  nums.sort((a, b) => a - b);

  let res = [];
  let mp = new Map();
  let n = nums.length;

  for (let i = 0; i < n; i++) {
    mp.set(nums[i], i);
  }

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 移除重複
    for (let j = i + 1; j < n - 1; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // 移除重複

      const target = -(nums[i] + nums[j]);
      const k = mp.get(target) ?? -1;

      if (k > j) {
        res.push([nums[i], nums[j], nums[k]]);
      }
    }
  }

  return res;
};

/**
 * Solution 使用雙指針優化
 *
 * 除第一層外的第二與第三層可以透過雙指針的方式去查找組合。
 * 如此一來，由於雙指針是每次都會移動一次來找出所以可能
 *
 * 最外層的回圈會執行 i: [0..N-3] ，總共 N-2 次，也雙指針查找要執行的次數。
 * 然而，內圈雙指針的每次查找的範圍，每次固定至少減1，
 *
 * 所以整體的時間複雜度計算上, 若總體數量為N, 每次查找數量S
 * -> i = 0,   S= N-2, (扣掉前兩項)
 * -> i = 1,   S= N-3,
 *        ...
 * -> i = N-3, S= 1,
 * --------------------總共 N-2 次
 *
 * 根據求總公式: (首項 + 末項) x (項數) / 2
 * -> (N-2 + 1) x (N-2) / 2
 * -> (N-1) x N-2 / 2
 * -> 近似(N^2)/2,
 *
 * 故時間複雜度為O(N^2)，與使用HashTable一樣，但就空間複雜度優化為 O(1)
 *
 * Time Complexity : O(N^2)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);

  let res = [];

  for (let i = 0, n = nums.length; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 使用雙指針
    let l = i + 1;
    let r = n - 1;
    while (l < r) {
      if (nums[l] + nums[r] > -nums[i]) {
        r -= 1;
      } else if (nums[l] + nums[r] < -nums[i]) {
        l += 1;
      } else {
        res.push([nums[i], nums[l], nums[r]])
        while (l < r && nums[l] === nums[l + 1]) l += 1; //檢查下一位，重複則跳過
        while (l < r && nums[r] === nums[r - 1]) r -= 1; //檢查下一位，重複則跳過
        l += 1; // 要先減1，再去重複
        r -= 1; // 要先減1，再去重複
      }
    }
  }
  return res;
};

// 測試
(function () {
  console.log("Testing [p0015_3sum]...");

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

  const testingWith = (cb) => {
    console.log(
      isArrayEqual(cb([-1, 0, 1, 2, -1, -4]), [
        [-1, -1, 2],
        [-1, 0, 1],
      ])
    );
    console.log(isArrayEqual(cb([]), []));
    console.log(isArrayEqual(cb([0]), []));
    console.log(isArrayEqual(cb([0, 0]), []));
    console.log(isArrayEqual(cb([0, 0, 0]), [[0, 0, 0]]));
    console.log(isArrayEqual(cb([0, 0, 0, 0, 0, 0]), [[0, 0, 0]]));
  };

  console.log("Testing [threeSum_bruteforce]");
  testingWith(threeSum_bruteforce);

  console.log("Testing [threeSumHashTable]");
  testingWith(threeSumHashTable);

  console.log("Testing [threeSum]");
  testingWith(threeSum);

  console.log("All Testing Passed ✅");
})();
