// @ts-check

// 題目鏈結
// https://leetcode.com/problems/majority-element

// 題目說明
// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times.
// You may assume that the majority element always exists in the array.
//

// Example 1:
// Input: nums = [3,2,3]
// Output: 3
//

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2
//

// Constraints:
// n == nums.length
// 1 <= n <= 5 * 10^4
// -2^31 <= nums[i] <= 2^31 - 1
//

// Follow-up: Could you solve the problem in linear time and in O(1) space?

// 解題重點
// 1. 瞭解 HashTable 的使用
// 2. 此題定義的眾數 (majority-element) 非指出現最多的數，而是超過"總數一半以上的數" (N/2)。
// 3. 瞭解摩爾投票法(Boyer–Moore majority vote algorithm)與使用時機: 
//    假設總共有N個投票者，若想找出前 k 名最多得票的候選人，則必定當選的得票數需至少超過 "N/k+1"
//    e.g : 若取1名，其所需得票 > N/2 以上 (取得總得票數的一半以上的票數)
//          換句話說，若僅能持有相對多數，但是未超過 N/2 時，此方法將無效。

// 解題思路
// 1. 應能先透過HashTable思考出暴力解，空間複雜度 O(N)。
// 2. 再透過 摩爾投票法 將空間複雜度 優化成O(1)

// Solution : HashTable 暴力解
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElementBrute = function (nums) {
  let half = nums.length / 2;
  let mp = {};
  for (const num of nums) {
    mp[num] = (mp[num] ?? 0) + 1;
    if (mp[num] > half) return num; // 根據題目定義，必有一解
  }
};

/**
 * Solution: 使用 摩爾投票法                   
 * 
 * 運用兩個變數與三個判斷:
 * - 兩個變數: 領先得票(cnt)、領先者(res)
 * - 三個判斷:
 *    1. 得票 : cnt > 1, 且又是投給領先者
 *    2. 持平 : cnt === 0,  
 *       (1) 情境一 : 初始化階段，因還未有人得票時
 *       (2) 情境二 : 從占上風因他人得票，或其他原因被扣票到 0 時
 *       無論 (1)、(2) 接下來的一票決定是否"領先者替換成他人"或是"領先者維持領先"
 *    3. 失票 : cnt > 1, 但不是投給領先者
 * 
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let res = 0;
  let cnt = 0;
  for (const num of nums) {
    if (cnt > 0 && num === res) {
      cnt += 1;
    } else if (cnt === 0) { // 如果票被扣到0，又得票，那就自己繼續佔上風；反之，就會被替換。
      cnt = 1;
      res = num;
    } else {
      cnt -= 1;
    }
  }
  return res;
};

// 測試
(function () {
  console.log('Testing [p0169_majorityElement]...');

  console.log(majorityElementBrute([3, 2, 3]) === 3);
  console.log(majorityElementBrute([2, 2, 1, 1, 1, 2, 2]) === 2);
  console.log(majorityElement([3, 2, 3]) === 3);
  console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2);

  console.log('All Testing Passed ✅');
})();
