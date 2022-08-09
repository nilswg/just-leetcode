// @ts-check

// 題目鏈結
// https://leetcode.com/problems/first-bad-version/

// 題目說明
// Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one,
// which causes all the following ones to be bad.
//
// You are given an API bool isBadVersion(version) which returns whether version is bad.
// Implement a function to find the first bad version. You should minimize the number of calls to the API.

// Example 1:
//
// Input: n = 5, bad = 4
// Output: 4
//
// version list: [1, 2, 3, 4, 5]
// isBadVersion: [o, o, o, x, x]
//
// 第一個錯誤的版本號是 4。

// Example 2:
//
// Input: n = 1, bad = 1
// Output: 1
//
// version list: [x]
// isBadVersion: [1]
//
// 第一個錯誤的版本號是 1。

// 解題重點
// 1.本題在回答與測試時使用到JS的 callback 的技巧，以及高階函式(HOF)。
// 2.先以暴力法去解釋題目需求
// 3.再使用二分搜尋法去優化速度。

// 解題思路
// 1.isBadVersion 是題目事先提供給我的方法，我們必須透過它來檢查版本號 x，如果是壞的就是 true；正確的反而是 false。
// 2.最直覺的方式，便是直接使用暴力法，從最大版本號 N 開始，由後向前檢查。 順序上是 (N--)。
// 3.最透過二分搜尋法去優化，由於目標不是找到特定值，是第一個壞的，所以用最終 l 所在位置作為答案。

// Solution 1: 暴力解
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution1 = function (isBadVersion) {
  /**
   * @param {number} n Total versions
   * @return {number} The first bad version
   */
  return function (n) {
    while (isBadVersion(n)) {
      n -= 1;
    }
    return n + 1;
  };
};

// Solution 2: 二分搜尋(Bianry Search)
//
// 複雜度
// Time Complexity : O(logN)
// Space Complexity: O(1)

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution2 = function (isBadVersion) {
  /**
   * @param {number} n Total versions
   * @return {number} The first bad version
   */
  return function (n) {
    let l = 1;
    let r = n;
    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      if (isBadVersion(m)) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
    return l;
  };
};

// 測試
(function () {
  console.log('Testing [p0278_FirstBadVersion]...');

  const testingWith = (yourSolFn) => {

    // 方便測試用的 isBadVersion 方法
    const isBadVersion = (bad) => (n) => {
      if (n >= bad) return true;
    };
    console.log(yourSolFn(isBadVersion(4))(100) === 4);

    console.log(yourSolFn(isBadVersion(1))(100) === 1);

    console.log(yourSolFn(isBadVersion(87))(100) === 87);
  };

  console.log('Testing [solution1]...');
  testingWith(solution1);

  console.log('Testing [solution2]...');
  testingWith(solution2);

  console.log('All Testing Passed ✅');
})();
