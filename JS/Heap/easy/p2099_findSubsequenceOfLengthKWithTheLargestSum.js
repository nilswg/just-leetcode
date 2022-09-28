// @ts-check

// 題目鏈結
// https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum

// 題目說明
// You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.
// Return any such subsequence as an integer array of length k.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
//

// Example 1:
// Input: nums = [2,1,3,3], k = 2
// Output: [3,3]
// Explanation:
// The subsequence has the largest sum of 3 + 3 = 6.
//

// Example 2:
// Input: nums = [-1,-2,3,4], k = 3
// Output: [-1,3,4]
// Explanation:
// The subsequence has the largest sum of -1 + 3 + 4 = 6.
//

// Example 3:
// Input: nums = [3,4,3,3], k = 2
// Output: [3,4]
// Explanation:
// The subsequence has the largest sum of 3 + 4 = 7.
// Another possible subsequence is [4, 3].
//

// Constraints:
// 1 <= nums.length <= 1000
// -10⁵ <= nums[i] <= 10⁵
// 1 <= k <= nums.length
//

// 解題重點
// 1. 瞭解 PriorityQueue 與 Heap

// 解題思路
// 1. 找出前k大的元素形成的集合序列，且須按原序列(nums)中出現順序進行排序。
//    e.g: [3,2,4,1], k=2 
// => ans: [3,4] 
//    e.g: [4,-1,2,1], k=2 
// => ans: [4,2] 

/**
 * Solution : 暴力解，使用 HashMap
 * 
 * 1. 先大到小重排後得到新序列 dec
 * 2. 僅須記錄前k個dec中的元素於map中
 * 3. 再遍歷整個nums序列一次，且逐元素比對是否為map中的元素。
 *    如此一來，便可以找出前k大的元素序列，同時兼顧其出現順序。
 *
 * 複雜度
 * Time Complexity : O(nlogn) // n 為 nums.length;
 * Space Complexity: O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSubsequenceHashMap = function (nums, k) {
  const dec = [...nums].sort((a, b) => b - a);
  const map = new Map();
  for (let i = 0; i < k; i++) {
    const num = dec[i];
    map.set(num, (map.get(num) || 0) + 1);
  }

  let res = [];
  for (const num of nums) {
    const cnt = map.get(num) || 0;
    if (cnt > 0) {
      res.push(num);
      map.set(num, cnt - 1);
    }
  }

  return res;
};

/**
 * Solution : 使用 Heap
 * 
 * Heap 就是一種包含數據本身(data)與其優先權(priority)的資料結構，即 [data, priority]
 * 本題的 nums[i] 即是 priority；而 i 即是 data。須先轉換為 [i, nums[i]]
 * 
 * 而本題因排序後，被取出的元素不需要重新放回序列中，故可以簡化其實作方式。
 * 
 * 即先以priority進行排序 -> 再刪減所短序列後 -> 再根據index進行排序。
 *
 * 複雜度
 * Time Complexity : O(nlogn) // n 為 nums.length;
 * Space Complexity: O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSubsequenceHeap = function (nums, k) {
  let cnts = nums.map((num, i) => [i, num]); // => [index, priority] (priority即數值)
  cnts.sort((a, b) => b[1] - a[1]); // 按 priority 排序
  cnts.length = k; // 保留前 0..k 個較大的元素
  cnts.sort((a, b) => a[0] - b[0]); // 按 index 排序
  return cnts.map((e) => e[1]);
};

// 測試
(function () {
  console.log('Testing [p2099_findSubsequenceOfLengthKWithTheLargestSum]...');
  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };
  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isEqual(cb([2, 1, 3, 3], 2), [3, 3]));
    console.log(isEqual(cb([-1, -2, 3, 4], 3), [-1, 3, 4]));
    console.log(isEqual(cb([3, 4, 3, 3], 2), [3, 4]));
  };

  testingWith(maxSubsequenceHashMap);
  testingWith(maxSubsequenceHeap);

  console.log('All Testing Passed ✅');
})();
