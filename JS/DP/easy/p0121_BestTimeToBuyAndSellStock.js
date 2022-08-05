// @ts-check

// 題目鏈結
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

// 題目說明
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// 解題重點
// 低點買入；高點賣出，但是高點的必須在買入低點之後，
// 換句話說，你不可以直接返回 (最大值 - 最低值) 作為答案。

// 解題思路
// 遍歷時，逐步更新最低點(min)與最大獲利(res)；
// 若當前賣出價格減去低點存在獲利時(即 prices[i] > min)，
// 將當前獲利大於先前的獲利紀錄中時，則更新，直至遍歷結束即能找出最大的結果。

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let min = 10000;

  /**
   * 若不存在獲利，此值為 0，如: [4,3,2,1]
   */
  let res = 0;
  for (const p of prices) {
    if (p > min) {
      res = Math.max(res, p - min);
    } else {
      min = p;
    }
  }
  return res;
};

// 測試
(function () {
  console.log('Testing [p0121_BestTimeToBuyAndSellStock]...');
  console.log(maxProfit([7, 6, 4, 3, 1]) === 0);
  console.log(maxProfit([7, 1, 5, 3, 6, 4]) === 5);
  console.log('All Testing Passed ✅');
})();
