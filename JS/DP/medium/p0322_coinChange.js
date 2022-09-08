// @ts-check

// 題目鏈結
// https://leetcode.com/problems/coin-change

// 題目說明
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin.
//

// Example 1:
// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
//

// Example 2:
// Input: coins = [2], amount = 3
// Output: -1
//

// Example 3:
// Input: coins = [1], amount = 0
// Output: 0
//

// Constraints:
// 1 <= coins.length <= 12
// 1 <= coins[i] <= 2³¹ - 1
// 0 <= amount <= 10⁴
//

// 解題重點
// 1. 先從 Divide&Conquer 將問題拆解成多個子問題，繪製其遞迴樹。完成暴力解
// 2. 將重覆的子問題結果記憶化，掌握動態規劃(DP)技巧來優化時間複雜度。

// 解題思路
// 1. Divide&Conquer 實作暴力解
// 2. 使用 DP 優化時間複雜度
// 3. 優化為 BottomUp 實作最佳解。
// 4. 延伸思考 DFS + Greedy + Prune 來實作時的缺點。

/**
 * Solution : 以遞迴實作暴力解，窮舉所有可能
 *
 * 參考:https://leetcode.cn/problems/coin-change/solution/dong-tai-gui-hua-tao-lu-xiang-jie-by-wei-lai-bu-ke/
 *
 * Step1: 根據問題:coins = [1,2,5], amount = 11，我們繪製出其局部的遞迴樹
 *
 * (1) 局部遞迴樹 - amount = 11
 * [註]: ∆ 表示底下還有省略，但省略。
 *
 *                11
 *         /       |       \
 *       10        9        6
 *      / | \    / |  \     ∆
 *     9  8  5  8  7   4
 *     ∆  ∆ /|\ ∆  ∆  /| \
 *         4 3 0     3 2 -1
 *         ∆ ∆       ∆
 *
 * (2) 局部遞迴樹 - amount = 4
 *
 *                 4
 *         /       |       \
 *        3        2       -1
 *      / | \   /  |  \
 *     2  1 -2  1  0  -3
 *   / | \
 *  1  0 -3
 *
 *
 * Step2: 我們可以整理出以下遞迴規則 :
 * (1) INF, n<0
 * (2)   0, n=0
 * (3)   1, n>0 and n in coins
 * (4)   1+ min( f(n-coin) | coin in coins ), n>0 and n not in coins
 *
 *
 * f(-1..) = INF // 負數皆設置為無限大 Infinity
 * f(0) = 0   // 參考 Example 3
 * f(1) = 1   // 若 n in coins, 則為1
 * f(2) = 1   // 若 n in coins, 則為1
 * f(3) = min(f(2), f(1), f(-2)) = min(1,1,INF) +1 = 2
 * f(4) = min(f(3), f(2), f(-1)) = min(2,1,INF) +1 = 2
 * f(5) = // 若 n in coins, 則為1
 * f(6) = min(f(5), f(4), f(1)) = min(1, 2, 1)  +1 = 2
 * f(7) = min(f(6), f(5), f(2)) = min(2, 1, 1)  +1 = 2
 * f(8) = min(f(7), f(6), f(3)) = min(2, 2, 2)  +1 = 3
 * f(9) = min(f(8), f(7), f(4)) = min(3, 2, 2)  +1 = 3
 * f(10)= min(f(9), f(8), f(5)) = min(3, 3, 1)  +1 = 2
 * f(11)= min(f(10),f(9), f(6)) = min(2, 3, 2)  +1 = 3
 *
 * 答案為 : 3
 *
 *
 * (1) k, 即不同面值的硬幣類型數量(k, coins.length)
 * (2) N, 表欲求得 amount
 * (3) 時間複雜度, 即遞迴樹節點個數。以最糟情況來思考，假設硬幣中含有面值1的硬幣，
 *     而當僅用 1的硬幣實現遞迴樹，則這棵樹就會有amount層，且每下一層又會切分成 k分支。
 * [註] 可以參考climbingStairs的複雜度分析，故為 O(k^n)。
 *
 * 複雜度
 * Time Complexity : O(k^N)
 * Space Complexity: O(N)
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeBrute = function (coins, amount) {
  const dp = (n) => {
    if (n < 0) return Infinity;
    if (n === 0) return 0;
    if (coins.includes(n)) return 1;

    let fewest = Infinity;
    for (const coin of coins) {
      fewest = Math.min(fewest, dp(n - coin) + 1);
    }

    return fewest;
  };

  const ans = dp(amount);
  return ans !== Infinity ? ans : -1;
};

/**
 * Solution : 使用 mem 儲存
 * 
 * 初始化時，我們已在mem裡，事先定義了 f(0) = 0,  還有 f(i) = 1 此處 i 表示。
 * 因為當 i 是 coins 中存在的任一面值時，即使用1枚該面值i 的硬幣，就可以湊出目前的amount，
 * 不用再向下去拆分成子問題。
 * 
 * 時間複雜度分析: 
 * dp 會遞迴執行(N)次，其中，內層迴圈又要執行 coins.length, 即 k 次。故時間複雜度 O(N*k)
 * 
 * 複雜度
 * Time Complexity : O(Nk) ≒ O(N)
 * Space Complexity: O(k+N)
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeMemo = function (coins, amount) {
  const mem = {};
  for (const c of coins) {
    // Space: O(k)
    mem[c] = 1;
  }

  // Space: O(N)
  const dp = (n) => {
    if (n < 0) return Infinity;
    if (n === 0) return 0;
    if (mem[n]) return mem[n];

    let fewest = Infinity;
    for (const coin of coins) {
      fewest = Math.min(fewest, dp(n - coin) + 1);
    }
    mem[n] = fewest;
    return fewest;
  };

  const ans = dp(amount);
  return ans !== Infinity ? ans : -1;
};

/**
 * Solution : Bottom Up
 * 
 * 可以對迴圈的結構進行調整，把對coins的迴圈放到了外層，
 * 而內層原本為 0..amount 的迴圈，將其起始值，更為 coin..amount。
 *
 * 複雜度
 * Time Complexity : O(Nk) ≒ O(N)
 * Space Complexity: O(N)
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeBottomUp = function (coins, amount) {
  const n = amount + 1; //(含0)
  const INF = amount + 1;
  const dp = new Array(n).fill(INF);
  dp[0] = 0;

  // for (let i = 1; i < n; i++) {
  //   for (const coin of coins) {
  //     if (i - coin < 0) continue;
  //     dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  //   }
  // }

  // 優化 i 從 coin 開始
  for (const coin of coins) {
    for (let i = coin; i < n; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === INF ? -1 : dp[amount];
};

/**
 * Solution : DFS + Greedy + prune (非最佳解)
 * 
 * 此解相當使用 DFS 去實作暴力解，只是再加入的剪枝去優化性能。
 * 
 * 先對coins進行一次大到小的排序，時間複雜度為O(KlogK)，但由於 K 最大為 12，此處可忽略其運算時間。
 * 在此作法上，是希望優先用大的硬幣面值去搜尋，一般情形下，便可以很快先發現一解，並之後以此為"基準"，
 * 如果後續的分支即使可能有解，但其硬幣數量若大於此"基準"都會被剪枝放棄，因此節省的效能。
 * 
 * 然而，若以最糟的情形來看，若該題沒有解，則會執行整顆樹的計算，時間複雜度為 O(k^n)。
 *
 * 複雜度
 * Time Complexity : O(k^n)，所以跑起來仍然會超時。
 * Space Complexity: O(N)
 *
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeDFS = function (coins, amount) {
  const dfs = (s, amount, count, ans) => {
    if (amount === 0) {
      return Math.min(ans, count);
    }
    const coin = coins[s];
    const maxNumofCoin = Math.floor(amount / coin);
    if (s === coins.length - 1) {
      if (amount % coin === 0) {
        return Math.min(ans, count + maxNumofCoin);
      }
      return ans;
    }
    for (let k = maxNumofCoin; k >= 0 && count + k < ans; k--) {
      ans = dfs(s + 1, amount - k * coin, count + k, ans);
    }
    return ans;
  };

  coins.sort((a, b) => b - a); 
  let INF = amount + 1;
  let ans = dfs(0, amount, 0, INF);
  return ans === INF ? -1 : ans;
};

// 測試
(function () {
  console.log("Testing [p0322_coinChange]...");

  const testingWith = (cb) => {
    console.log(cb([1, 2, 5], 11) === 3);
    console.log(cb([2], 3) === -1);
    console.log(cb([1], 0) === 0);
    console.log(cb([2, 5, 10, 1], 27) === 4);
    console.log(cb([186, 419, 83, 408], 6249) === 20); // Brute會超時
    console.log(
      cb([411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422], 9864) ===
        24
    ); // Brute、DFS貪婪 均會超時
  };

  // console.log("Testing [coinChangeBrute]");
  // testingWith(coinChangeBrute);
  console.log("Testing [coinChangeMemo]");
  testingWith(coinChangeMemo);
  console.log("Testing [coinChangeBottomUp]");
  testingWith(coinChangeBottomUp);
  console.log("Testing [coinChangeDFS]");
  testingWith(coinChangeDFS);

  console.log("All Testing Passed ✅");
})();
