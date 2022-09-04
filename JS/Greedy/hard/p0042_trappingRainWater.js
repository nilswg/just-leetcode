// @ts-check

// 題目鏈結
// https://leetcode.com/problems/trapping-rain-water

// 題目說明
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
//

// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
//

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9
//

// Constraints:
// n == height.length
// 1 <= n <= 2 * 10⁴
// 0 <= height[i] <= 10⁵
//

// 解題重點
// 1. 先以暴力解去瞭解問題。
// 2. 再進行優化，可以使用 hashMap 去紀錄已經重複出現的高度，

// 解題思路
// 1. 左右兩側不算牆，可視為 0。
// 2. 先透過暴力解去瞭解題目，分析積水量與左側最大高度(left_maxH)、右側最大高度(right_maxH)的關係
// 3. 進一步思考優化方式，可用雜湊表記憶重複計算的部分。
// 4. 改以Greedy為核心策略，透過雙指針算法，將空間複雜度優化為O(1) (作法可參考 p0011)

/**
 * Solution : 暴力解，窮舉組合並釐清問題。
 *
 * 1. 每個位址 i 的積水面積算法 :
 *    (1) left_maxH  : 位址 i 往左能找到的最大高度
 *    (2) right_maxH : 位址 i 往右能找到的最大高度
 *    (3) i_maxH : min(left_maxH, right_maxH)，才是該位址能達到的最高積水高度。
 *    (4) 該位址i積水量還要扣除自身牆的高度，即 max(i_maxH - height[i], 0)；
 *        若兩者之差 > 0 則加總此段積水量；反之，則為0，代表無任何積水。
 *
 * [註] 口: 為牆、～: 積水
 * 
 * e.g [0,1,0,2,1,0,1,3,2,1,2,1]
 *
 *     |－－－－－－－口－－－－|
 *     |－－－口～～～口口～口－|
 *     |－口～口口～口口口口口口|
 *          1  1 2 1    1
 *
 * e.g [4,2,0,3,2,5]
 *
 *     |－－－－－口|
 *     |口～～～～口|
 *     |口～～口～口|
 *     |口口～口口口|
 *     |口口～口口口|
 *        2 4 1 2
 *
 * 複雜度
 * Time Complexity : O(N²)
 * Space Complexity: O(1)
 *
 * @param {number[]} height
 * @return {number}
 */
var trapBrute = function (height) {
  let res = 0;
  for (let i = 0, n = height.length; i < n; i++) {
    let lt = 0;
    for (let l = i - 1; l >= 0; l--) {
      lt = Math.max(height[l], lt);
    }

    let rt = 0;
    for (let r = i + 1; r < n; r++) {
      rt = Math.max(height[r], rt);
    }

    let ht = Math.min(lt, rt); // 該位址雨水能積累的最大高度
    let area = Math.max(ht - height[i], 0); // 實際積累的雨水面積
    res += area; // 實際積累的雨水面積
  }

  return res;
};

/**
 * Solution : Memorization，透過HashMap優化時間複雜度。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var trapHashMap = function (height) {
  const n = height.length;
  const leftMaxH = Array(n).fill(0);
  const rightMaxH = Array(n).fill(0);
  let res = 0;

  for (let i = 1; i < n; i++) {
    leftMaxH[i] = Math.max(height[i - 1], leftMaxH[i - 1]);
  }

  for (let i = n - 2; i >= 0; i--) {
    rightMaxH[i] = Math.max(height[i + 1], rightMaxH[i + 1]);
  }

  for (let i = 0; i < n; i++) {
    let ht = Math.min(leftMaxH[i], rightMaxH[i]); // 該位址雨水能積累的最大高度
    let area = Math.max(ht - height[i], 0); // 實際積累的雨水面積
    res += area; // 實際積累的雨水面積
  }

  return res;
};

/**
 * Solution : 使用雙指針 + Greedy，優化空間複雜度為 O(1)
 *
 *  e.g: [3,1,1,1,2]
 *
 *   |口－－－－|
 *   |口～～～口|
 *   |口口口口口|
 *    0 1 2 3 4
 *
 *   透過 height[l] 與 height[r] 來決定移動哪一側，被移動的那一側相當捨去部分狀態，
 *   因為當前積水量僅受 min(maxL, maxR)影響。(可以參考 p0011，捨去狀態的部分邏輯非常相似)
 *   maxL     l     r     maxR      res
 *    0       0     4      0         0   => (move r--) 捨去[1,4],[2,4],[3,4]的組合。
 *
 *   當前積水量的公式 : max( min(maxL, minR) - height[i], 0)，將面對三種狀況 :
 *   (1) 左側高度較大，右側將被移動時 : max( min( height[l] , minR) - height[r], 0)      // maxl 被替代為 height[l]
 *   (2) 右側高度較大，右側將被移動時 : max( min( minL , height[r]) - height[r], 0)      // maxR 被替代為 height[r]
 *   (3) 左、右側高度相等時 : 固定為右側移動，邏輯同(2)
 *
 *   移動某一側後，更新 maxL/R 高度，作為下一次判斷的依據:
 *   (1) 左側被移動: maxL = max(height[l], maxL); l += 1;
 *   (2) 右側被移動: maxR = max(height[r], maxR); r -= 1;
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {number[]} height
 * @return {number}
 */
var trapTwoPointers = function (height) {
  const n = height.length;
  let res = 0;
  let l = 0;
  let r = n - 1;
  let maxl = 0;
  let maxr = 0;
  while (l < r) {
    if (height[l] > height[r]) {
      let ht = Math.min(height[l], maxr); // maxl 被替代為 height[l]
      res += Math.max(ht - height[r], 0);
      maxr = Math.max(maxr, height[r]);
      r -= 1;
    } else {
      let ht = Math.min(maxl, height[r]); // maxR 被替代為 height[r]
      res += Math.max(ht - height[l], 0);
      maxl = Math.max(maxl, height[l]);
      l += 1;
    }
  }

  return res;
};

/**
 * Solution : trapTwoPointers 簡潔代碼
 *
 * 1.左右兩側的最大高度，除先前最大高度外，加入當前高度。
 *   maxl = Math.max(maxl, height[l]);
 *   maxr = Math.max(maxr, height[r]);
 *
 * 2.由於最到高度，包含當前高度，所以決定移動哪側的依據，可以直接改動:
 *   將 height[l] > height[r]  改寫為  maxl > maxr
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {number[]} height
 * @return {number}
 */
var trapTwoPointersOptimal = function (height) {
  const n = height.length;
  let res = 0;
  let l = 0;
  let r = n - 1;
  let maxl = 0;
  let maxr = 0;
  while (l < r) {
    // 邊界上

    maxl = Math.max(maxl, height[l]);
    maxr = Math.max(maxr, height[r]);

    if (maxl > maxr) {
      // 等同於 height[l] > height[r]
      res += maxr - height[r];
      r -= 1;
    } else {
      res += maxl - height[l];
      l += 1;
    }
  }
  return res;
};

// 測試
(function () {
  console.log('Testing [p0042_trappingRainWater]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb([3, 1, 1, 1, 2]) === 3);
    console.log(cb([0, 3, 1, 1, 2]) === 2);
    console.log(cb([3, 1, 1, 2, 0]) === 2);
    console.log(cb([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6);
    console.log(cb([4, 2, 0, 3, 2, 5]) === 9);
  };

  testingWith(trapBrute);
  testingWith(trapHashMap);
  testingWith(trapTwoPointers);
  testingWith(trapTwoPointersOptimal);

  console.log('All Testing Passed ✅');
})();
