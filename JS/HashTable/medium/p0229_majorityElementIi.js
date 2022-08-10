// @ts-check

// 題目鏈結
// https://leetcode.com/problems/majority-element-ii

// 題目說明
// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.
//

// Example 1:
// Input: nums = [3,2,3]
// Output: [3]
//

// Example 2:
// Input: nums = [1]
// Output: [1]
//

// Example 3:
// Input: nums = [1,2]
// Output: [1,2]
//

// Constraints:
// 1 <= nums.length <= 5 * 10^4
// -10^9 <= nums[i] <= 10^9
// Follow up: Could you solve the problem in linear time and in O(1) space?
//

// 解題重點
// 1. 瞭解 HashTable 的使用
// 2. 參考 p0169的作法，瞭解摩爾投票法(Boyer–Moore majority vote algorithm)的應用
// 3. 根據 摩爾投票法的證明 : 若想找出前 k 名最多得票的候選人，假設總共有N個投票者，則必定當選的得票數需至少超過 "N/k+1"
//    e.g : 若取1名，則需 > N/2 (取得總得票數的一半以上的票數)
//          若取2名，則需 > N/3 (這也是本題描述的限制，所以我們至少需要 p, q 保存出現次數最多的前兩名數值。

// 解題思路
// 1. 先找出數量最多的前面名 p, q
// 2. 再找出實際 p, q 的總得票數。
// 3. 再根據各別 p, q 的總得票數判斷是否超過 N/3 ； 若超過則放入 res 中。

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElementii = function (nums) {
  let p = null;
  let q = null;
  let pCnt = 0;
  let qCnt = 0;
  let least = nums.length / 3;
  let res = [];

  // 找出最多數量的前兩名。
  for (const num of nums) {
    if (pCnt > 0 && num === p) {
      pCnt += 1;
    } else if (qCnt > 0 && num === q) {
      qCnt += 1;
    } else if (pCnt === 0) {
      p = num;
      pCnt = 1;
    } else if (qCnt === 0) {
      q = num;
      qCnt = 1;
    } else {
      pCnt -= 1;
      qCnt -= 1;
    }
  }

  // 求出最多數量的前兩名，各別實際總得票數
  pCnt = 0;
  qCnt = 0;
  for (const num of nums) {
    if (num === p) pCnt += 1;
    else if (num === q) qCnt += 1;
  }

  // 最終以總得票數大於 n/3 者，放入res中
  if (pCnt > least) res.push(p);
  if (qCnt > least) res.push(q);

  return res;
};

// 測試
(function () {
  console.log('Testing [p0229_majorityElementIi]...');

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };
  console.log(isEqual(majorityElementii([3, 2, 3]), [3]));
  console.log(isEqual(majorityElementii([1]), [1]));
  console.log(isEqual(majorityElementii([1, 2]), [1, 2]));

  console.log('All Testing Passed ✅');
})();
