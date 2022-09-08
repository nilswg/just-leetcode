// @ts-check

// 題目鏈結
// https://leetcode.com/problems/minimum-cost-for-tickets

// 題目說明
// You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array days. Each day is an integer from 1 to 365.
// Train tickets are sold in three different ways:
// a 1-day pass is sold for costs[0] dollars,
// a 7-day pass is sold for costs[1] dollars, and
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.
// For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
// Return the minimum number of dollars you need to travel every day in the given list of days.
//

// Example 1:
// Input: days = [1,4,6,7,8,20], costs = [2,7,15]
// Output: 11
// Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
// On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
// On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
// On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
// In total, you spent $11 and covered all the days of your travel.
//

// Example 2:
// Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
// Output: 17
// Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
// On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
// On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
// In total, you spent $17 and covered all the days of your travel.
//

// Constraints:
// 1 <= days.length <= 365
// 1 <= days[i] <= 365
// days is in strictly increasing order.
// costs.length == 3
// 1 <= costs[i] <= 1000
//

// 解題重點
// 1. 瞭解動態規劃
// 2. 可參考p0322作法。

// 解題思路
// 1. 固定三種車票可購買，狀態轉移
// 2.

/**
 * Solution : DFS 暴力解
 *
 * 使用 DFS - BackTracking 窮舉所有可能。
 *
 * 複雜度
 * Time Complexity : O(kⁿ) // n 為 365 天；k 為 3 種通行票。
 * Space Complexity: O(k)
 *
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTicketsBrute = function (days, costs) {
  const tickets = [
    [1, costs[0]],
    [7, costs[1]],
    [30, costs[2]],
  ];
  const n = days.length;

  const dp = (di) => {
    if (di >= n) {
      return 0;
    }
    let ans = Infinity;
    for (const [td, tc] of tickets) {
      const nextDay = days[di] + td;
      let dj = di; // 使用到BackTracking 要保留 di 狀態。
      while (dj < n && days[dj] < nextDay) {
        dj += 1;
      }
      ans = Math.min(ans, dp(dj) + tc);
    }
    return ans;
  };
  return dp(0);
};

/**
 * Solution : DFS + 動態規劃
 *
 * 加入Memo 使用動態規劃，對重覆子問題進行合併
 *
 * 複雜度
 * Time Complexity : O(kn) // n 為 365 天；k 為 3 種通行票。
 * Space Complexity: O(n)
 *
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
 var mincostTicketsDP = function (days, costs) {

  const tickets = [[1, costs[0]], [7, costs[1]], [30, costs[2]]];
  const n = days.length;
  const mem = new Map();

  const dp = (di) => {
      if (di >= n) {
          return 0;
      }
      if (mem.has(di)) {
         return mem.get(di)
      }
      mem.set(di, Infinity);
      for (const [td, tc] of tickets) {
          const nextDay = days[di] + td;
          let dj = di; // 使用到BackTracking 要保留 di 狀態。
          while (dj < n && days[dj] < nextDay) {
              dj += 1;
          }
          mem.set(di, Math.min(mem.get(di), dp(dj) + tc));
      }
      return mem.get(di);
  }
  return dp(0)
};

/**
 * Solution : 改為 BottomUp
 *
 * 複雜度
 * Time Complexity : O(kn) // n 為 365 天；k 為 3 種通行票。
 * Space Complexity: O(n)  
 *
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
 var mincostTicketsBottomUp = function (days, costs) {
  const tickets = [
    [1, costs[0]],
    [7, costs[1]],
    [30, costs[2]],
  ];

  const maxDay = days[days.length - 1] + 1; //最後一天有效日再加1。
  const dp = new Array(maxDay).fill(Infinity);
  dp[0] = 0;

  let di = 0;

  for (let day = 1; day < maxDay; day++) {
    // 非有效的出遊日，其 minCost 就是前一天的狀態延續。
    if (day !== days[di]) {
      dp[day] = dp[day - 1];
      continue;
    }
    // 若為有效日的出遊日，其花費便是1、7、30日前的最低消費，再分別加上此次消費。
    for (const [td, tc] of tickets) {
      const previousDayCost = (dp[day - td] ?? 0) + tc;
      dp[day] = Math.min(dp[day], previousDayCost);
    }
    di += 1; //換到下一個有效出遊日。
  }

  return dp[maxDay - 1];
};

// 測試
(function () {
  console.log("Testing [p0983_minimumCostForTickets]...");

  const testingWith = (cb) => {
    console.log(cb([1, 4, 6, 7, 8, 20], [2, 7, 15]) === 11);
    console.log(cb([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]) === 17);
  };

  console.log('[mincostTicketsBrute]')
  testingWith(mincostTicketsBrute)
  console.log('[mincostTicketsDP]')
  testingWith(mincostTicketsDP)
  console.log('[mincostTicketsBottomUp]')
  testingWith(mincostTicketsBottomUp)

  console.log("All Testing Passed ✅");
})();
