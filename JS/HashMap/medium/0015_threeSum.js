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

// 暴力解
// Time Complexity : O(N^3)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  let n = nums.length;
  let res = [];

  nums.sort(); // 為了能避免重複，先排序

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          res.push(`${nums[i]},${nums[j]},${nums[k]}`);
        }
      }
    }
  }

  return Array.from([...new Set(res)]).map((x) => {
    return x.split(',').map((x) => Number(x));
  });
};

// 測試
(function () {
  console.log('Testing threeSum...');
  console.log(threeSum([-1, 0, 1, 2, -1, -4]).length === 2);
  // console.log(threeSum([]).length === 0);
  // console.log(threeSum([0]).length === 0);
  // console.log(threeSum([0, 0, 0, 0]).length === 1);
  // console.log(threeSum([0, 0, 0, 0, 0, 0]).length === 1);
  // console.log(threeSum([-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]).length === 1);
})();
