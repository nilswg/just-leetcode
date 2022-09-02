// @ts-check

// 題目鏈結
// https://leetcode.com/problems/container-with-most-water

// 題目說明
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
// Return the maximum amount of water a container can store.
// Notice that you may not slant the container.
//

// Example 1:
// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
//

// Example 2:
// Input: height = [1,1]
// Output: 1
//

// Constraints:
// n == height.length
// 2 <= n <= 10⁵
// 0 <= height[i] <= 10⁴
//

// 解題重點
// 1. 瞭解雙指針使用
// 2. 瞭解Greedy演算法

// 解題思路
// 1. 題旨求出最大的矩形面積，即(寬x高)，可根據Greedy作為思路核心，列舉所有寬高組合，找出乘積組合大者即是解答。
// 2. 構想一，以高度優先，每次取其中兩最大高度 (h1,h2)，再根據 min(h1,h2) x (w1-w2)去求解，
//    然而，這樣就必須先排序過，才能確保找出最大組合。其時間複雜度必定超過O(nlogn)。
// 3. 構想二，以寬度優先，可使用雙指針，起始位址分別為[0, n-1]，這能確保最大寬度。且每次保留高度較大者，
//    若高度較小則移動至下一個，相等者固定取某一側去移動。
// 4. 承 2,3 明顯構想二更加實際。
// 5. 消除狀態證明 :
//      e.g: [1, 8, 6, 2, 5, 4, 8, 3, 7]
//            ^l                      ^r
//      當 h[l] < h[r]，l = l+1; 移動高度較小者至下一個，相當於放棄 [0,l+1]...[0,r-1] 組合
//      證明: [0,l+1]...[0,r-1] 組合中存在大於當前最大面積。
//      首先，矩形面積為高x寬: 高度固定為 h[l]；其寬度界在 [1...r-(l+1)]，皆一定小於當前的 r-l
//      故，放棄的部分一定比當前組合都小，不可能存在答案。

/**
 * Solution : 使用雙指針 + Greedy
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {number[]} height
 * @return {number}
 */
var maxAreaWidthFirst = function (height) {
  let l = 0;
  let r = height.length - 1;
  let res = 0;
  while (l < r) {
    let lt = height[l];
    let rt = height[r];
    res = Math.max(res, Math.min(lt, rt) * (r - l));
    if (lt > rt) {
      r -= 1;
    } else {
      l += 1;
    }
  }
  return res;
};

// 測試
(function () {
  console.log('Testing [p0011_containerWithMostWater]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb([1, 8, 6, 2, 5, 4, 8, 3, 7]) === 49);
    console.log(cb([1, 1]) === 1);
  };
  testingWith(maxAreaWidthFirst);

  console.log('All Testing Passed ✅');
})();
