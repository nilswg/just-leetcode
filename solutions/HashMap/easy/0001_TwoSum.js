//1. Two Sum
//Input: nums = [2,7,11,15], target = 9
//Output: [0,1]
//Output: Because nums[0] + nums[1] == 9, we return [0, 1].

// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const mp = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (mp.has(nums[i])) {
      return [mp.get(nums[i]), i];
    } else {
      mp.set(target - nums[i], i);
    }
  }
  return null;
};


// 解題重點
// 1. 了解 HashMap 基本概念與使用方式
// 2. HashMap儲存以值來找index，即 { key:value, value:index }