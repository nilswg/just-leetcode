// @ts-check

// 題目鏈結
// https://leetcode.com/problems/3sum/

// 題目說明
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
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

// 解題重點
// the solution set must not contain duplicate triplets. (必須去除重複)
// 為了去除重複，必須先排序

// 解題思路
// [-1,0,1,2,-1,-4]
// [-4,-1,-1,0,1,2]

// i, nums[i]   j, nums[j]   k, nums[k]                             res
// 0, -4,       1, -1,       2, -1        => -4 + -1 + -1  != 0      []
// 0, -4,       1, -1,       3,  0        => -4 + -1 +  0  != 0      []
// 0, -4,       1, -1,       4,  1        => -4 + -1 +  1  != 0      []
// 0, -4,       1, -1,       5,  2        => -4 + -1 +  2  != 0      []
// 1, -1,       2, -1 (duplicate j++)                                []
// 1, -1,       3,  0        4,  1        => -1 +  0 +  1  == 0      [[-1,0,1]]
// 1, -1,       3,  0        5,  2        => -1 +  0 +  2  != 0      [[-1,0,1]]
// 1, -1,       4,  1        5,  2        => -1 +  1 +  2  != 0      [[-1,0,1]]
// 1, -1,       5( < n-1)                                            [[-1,0,1]]
// 2, -1 (duplicate i++)                                             [[-1,0,1]]
// 3,  0        4,  1        5,  2        => -1 +  1 +  2  == 0      [[-1,0,1], [-1,1,2]]
// 4( < n-2)                                                         [[-1,0,1], [-1,1,2]]

// [0,0,0,0]
// i, nums[i]   j, nums[j]   k, nums[k]                             res
// 0,  0,       1,  0,       2,  0        => 0  +  0 +  0  == 0      [[0,0,0]]
// 0,  0,       1,  0,       3(duplicate k++)
// 0,  0,       1,  0,

// 解題重點
// 1. 執行總次數為 n - 2;
// 2. 先排序
// 3. 去除重複，觀察暴力解，可透過對比前一項來移除重複
// 4. 使用雙指標降低複雜。

// 暴力解
// Time Complexity : O(N^3)
// Space Complexity: O(1)

// 時間複雜度 O(n^3)
// 空間複雜度 O(n)

/**
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
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const res = [];

  // 将数组排序
  nums.sort((a, b) => a - b);

  const useTwoPointer = (iNum, l, r) => {
    while (l < r) {
      const sum = iNum + nums[l] + nums[r];
      if (sum < 0) l += 1;
      else if (sum > 0) r -= 1;
      else {
        res.push([iNum, nums[l], nums[r]]);
        l += 1;
        while (l < r && nums[l] === nums[l - 1]) {
          l += 1;
        }
      }
    }
  };

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 移除重複
    useTwoPointer(nums[i], i + 1, nums.length - 1);
  }
  return res;
};

// 測試
(function () {
  let isEqual = (set1, set2) => {
    let isElementEqual = (nums1, nums2) => {
      // 驗證長度是否一致
      if (nums1.length !== nums2.length) return true;

      // 確保兩者順序一致。
      nums1.sort();
      nums2.sort();

      // 比較內容是否完全一致。
      for (let i = 0; i < nums1.length; i++) {
        if (nums1[i] !== nums2[i]) {
          return false;
        }
      }
      return true;
    };

    if (set1.length !== set2.length) return false;

    for (let i = 0; i < set1.length; i++) {
      if (isElementEqual(set1[i], set2[i]) === false) {
        return false;
      }
    }

    return true;
  };

  console.log('Testing threeSum...');
  console.log(
    isEqual(threeSum_bruteforce([-1, 0, 1, 2, -1, -4]), [
      [-1, -1, 2],
      [-1, 0, 1],
    ])
  );
  console.log(isEqual(threeSum_bruteforce([]), []));
  console.log(isEqual(threeSum_bruteforce([0]), []));
  console.log(isEqual(threeSum_bruteforce([0, 0]), []));
  console.log(isEqual(threeSum_bruteforce([0, 0, 0]), [[0, 0, 0]]));
  console.log(isEqual(threeSum_bruteforce([0, 0, 0, 0, 0, 0]), [[0, 0, 0]]));
  console.log(isEqual(threeSum([]), []));
  console.log(isEqual(threeSum([0]), []));
  console.log(isEqual(threeSum([0, 0]), []));
  console.log(isEqual(threeSum([0, 0, 0]), [[0, 0, 0]]));
  console.log(isEqual(threeSum([0, 0, 0, 0, 0, 0]), [[0, 0, 0]]));
})();
