// @ts-check

// 題目鏈結
// https://leetcode.com/problems/partition-equal-subset-sum

// 題目說明
// Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.
//

// Example 1:
// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].
//

// Example 2:
// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.
//

// Constraints:
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100
//

// 解題重點
// 1. 瞭解動態規劃思考策略與實作方式
// 2. 可參考 0/1 背包問題、SubSet 等問題

// 解題思路
// 1. 根據題旨，將 nums 中所有元素相加總後取其一半(target)，而從nums中任取出若干個正整數的總和，若恰好滿足 target 即為答案。
// 2. 先思考暴力解，可以透過 dfs 方式窮舉所有數的組合情況，而時間複雜度隨組合的數量決定，故為 O(2ⁿ)， (n = target)
// 3. 根據 0/1 背包問題的想法，縮小範疇，找出所有"可能的加總"即可，由於時間複雜度隨數量決定，故為 O(mn)，(m = nums.length; n = target)

/**
 * Solution :
 *
 * e.g : [14,9,8,4,3,2]
 *
 * target 20
 * used Map(6) { 2 => 1, 3 => 1, 4 => 1, 8 => 1, 9 => 1, 14 => 1 }
 *
 *
 * num     k      curr
 *
 * 2       38     [ 2 ]
 * 3       35     [ 2, 3 ]
 * 4       31     [ 2, 3, 4 ]
 * 8       23     [ 2, 3, 4, 8 ]
 * 9 ,     23 - 9 < 20 and the larger values after that, break it.
 * pop 8 back to 4 curr [ 2, 3, 4 ]
 *
 * 9       22     [ 2, 3, 4, 9 ]
 * 14 , 22 - 14 < 20 and the larger values after that, break it.
 * pop 9 back to 4 curr [ 2, 3, 4 ]
 *
 * 14 , 31 - 14 < 20 and the larger values after that, break it.
 * pop 4 back to 3 curr [ 2, 3 ]
 *
 * 8       27     [ 2, 3, 8 ]
 * 9 , 27 - 9 < 20 and the larger values after that, break it.
 * pop 8 back to 3 curr [ 2, 3 ]
 *
 * 9       26     [ 2, 3, 9 ]
 * 14 , 26 - 14 < 20 and the larger values after that, break it.
 * pop 9 back to 3 curr [ 2, 3 ]
 *
 * 14       21     [ 2, 3, 14 ]
 * pop 14 back to 3 curr [ 2, 3 ]
 *
 * pop 3 back to 2 curr [ 2 ]
 *
 * 4       34     [ 2, 4 ]
 * 8       26     [ 2, 4, 8 ]
 * 9 , 26 - 9 < 20 and the larger values after that, break it.
 * pop 8 back to 4 curr [ 2, 4 ]
 *
 * 9       25     [ 2, 4, 9 ]
 * 14 , 25 - 14 < 20 and the larger values after that, break it.
 * pop 9 back to 4 curr [ 2, 4 ]
 *
 * 14 , 6 + 14 = 20,
 * curr [2, 4, 14], return true
 *
 * 複雜度
 * Time Complexity : O(2ⁿ) // n = target； nums 所有元素加總的一半
 * Space Complexity: O(n)
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartitionBrute = function (nums) {
  const total = nums.reduce((pre, cur) => pre + cur, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;

  const dfs = (n, st) => {
    if (n < target) return false;
    if (n === target) return true;
    for (let i = st; i < nums.length; i++) {
      if (dfs(n - nums[i], i + 1)) {
        return true;
      }
    }
    return false;
  };

  return dfs(total, 0);
};

/**
 * Solution: 0/1 Knapsack Problem、BottomUp
 *
 * 由於題旨為求出"總合"，因此我們不用去窮舉其所有可能的排序組合(可能數量: 2ⁿ)；
 * 而是縮小搜尋的範疇，關注其"總和"形成的集合，再檢查其中元素是否滿足答案即可。
 * 優化時間複雜度: O(2ⁿ) -> O(mn)
 *
 * [註] 關於何為透過較小的集合去求解的概念，可參考經典的[0/1背包問題]，
 *  (1) 問題的解，dp[i][j]: 在不超過 j 的情況下，試圖選入 1~i 個物品的最大價值。
 *  (2) 轉移方程式，dp[i][j] = { dp[i-1][j]                                 ,j < W[i]
 *                              max( dp[i-1][j], dp[i-1][j-W[i]] + V[i] )  ,j >= W[i] }
 *
 * 以本題而言，僅找出在不超過 target (總數的一半)的情況下，找出選入 1~i 個數值使其總合恰好為 target。

 * 實作上，透過 sums 的(Set)集合，其範疇為[1..target]，以 n 表示大小，
 * 每次選入一個新的元素(num)，與"前一次"存在於 sums 中的所有元素相加得到新的加總 (cur)，
 * 若 cur < target，則添入sums 集合中，假如 cur > target，不添加進sums中。
 * 最後，若能找到一滿足 cur === target，將可立即返回true，即找到解答。
 *
 * 
 * Time Complexity : O(mn) // m: nums.length; n: sums.length = target+1 ；
 * Space Complexity: O(n)  
 *
 * @param {*} nums
 * @returns
 */
var canPartitionUseSet = function (nums) {
  const total = nums.reduce((pre, cur) => pre + cur, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;

  // S: O(target+1)；+1 為第0位，代表皆不選，空集合的總合；
  const sums = new Set([0]);

  for (let i = 0, m = nums.length; i < m; i++) {
    const num = nums[i];
    const preSums = Array.from(sums);
    for (const sum of preSums) { //遍歷前，皆產生 sums 前次狀態陣列
      const cur = num + sum;
      if (cur > target) continue;
      if (cur === target) return true;
      sums.add(cur);
    }
  }

  return false;
};

/**
 * Solution: 使用 DP-BottomUp (參考 Leetcode.cn 的官方解答)
 *
 * 1. 邊界與 Corner Case 分析
 *    (1) nums.length，不可小於2。
 *    (2) total 為nums加總，不可以是奇數； 
 *    (3) target 為 total 的一半
 *    (4) maxNum 不可大於 target。 e.g  nums = [1,2], 2 > 1
 *
 * 2. 答案表示為 dp[i][j] ，即從 nums中的 [0..i] 的範圍中，選取若干正整數，存在加總結果為 j的情況
 * 3. 初始化時，dp 矩陣的大小為(mn)。(m = nums.length； n = target + 1)，令所有元素為 false，表示為"找不到"，接著考慮以下情況:
 *    (1) 起始條件，考慮 [0..i] 的範圍中，我們可以一個都不選，其總合可為0； 所以 dp[i][0] = true (0 <= i < m)
 *    (2) 起始條件，考慮第 0 個元素，dp[0][nums[0]] = true，一定成立。
 *    (3) 使用雙層迴圈求解 dp[i][j]。外圈，以i為index，範圍為 [1..m-1]； 內圈以j為index，範圍為[nums[i]..target]
 *        每次考慮新加入的 num 時，有可選與不選的兩種狀況，如:
 *        a. 不選 nums[i], dp[i][j] = dp[i-1][j]
 *        b.   選 nums[i], dp[i][j] = dp[i-1][j-nums[i]]
 *        c. 綜合上述 a、b，其中一個成立即可，故 dp[i][j] = (dp[i-1][j]) || (dp[i-1][j-nums[i]])
 * 
 * 3. 轉移方程式， dp[i][j] = { dp[i-1][j] || dp[i-1][j-nums[i]] , j >= nums[i]
 *                             dp[i-1][j]                       , j <  nums[i] }
 *    
 *    => 時間複雜度為 O(mn)；空間複雜大 O(mn) (m = nums.length； n = target + 1)
 *
 * 
 * 4. 進一步優化，發現 dp[i] 僅依賴於 dp[i-1]，每次遍歷後儲存的dp結果，會成為下一次的先前狀態。
 *    其次，為了避免使用到本次才加入的dp狀態。反向從大到小遍歷 [target..num]。
 *    技巧上，我們是用 0 跟 1 ，表示 false 和 true； 使用 |= 實作"或"邏輯比較合併結果
 *    
 *    => 時間複雜度為 O(mn)；空間複雜大 O(n) (m = nums.length； n = target + 1)
 *
 * 
 * 
 * Time Complexity : O(mn) // m = nums.length； n = target + 1
 * Space Complexity: O(n)
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartitionOptimal = function (nums) {
  const m = nums.length;
  if (m < 2) {
    return false;
  }
  let total = 0,
    maxNum = 0;
  for (const num of nums) {
    total += num;
    maxNum = maxNum > num ? maxNum : num;
  }
  if (total & 1) {
    return false;
  }
  const target = Math.floor(total / 2);
  if (maxNum > target) {
    return false;
  }
  // const dp = new Array(n).fill(0).map(() => new Array(target + 1).fill(false));
  // for (let i = 0; i < n; i++) {
  //   dp[i][0] = true; // 從第[0..n-1]項去選，滿足加總為0的狀況。
  // }
  // // 當僅有第0項可選時，一定滿足 dp[0][nums[0]] = true (j = nums[0])
  // dp[0][nums[0]] = true;
  // // 考量到邊界問題 i-1 > 0 ，故i從1開始。
  // for (let i = 1; i < n; i++) {
  //   const num = nums[i];
  //   for (let j = 1; j <= target; j++) {
  //     // 從選中的 num 開始，從第[0..n-1]項去選任意一個 nums[i], 能滿足 j 的結果。可能有兩種情形
  //     // (1) 包含 num，dp[i - 1][j - num]
  //     // (2) 不包含 num，dp[i - 1][j]
  //     // 綜觀(1)、(2)，即兩者其一成立為是(true)，反之，兩者皆不成立為否(false)
  //     dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num] || false;
  //   }
  // }
  // return dp[n - 1][target];

  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (const num of nums) {
    // 為了避免使用到本次才加入的狀態，反向從尾求到num
    for (let j = target; j >= num; --j) {
      dp[j] |= dp[j - num]; //  dp[j] = dp[j] | dp[j - num]; 
    }
  }
  return Boolean(dp[target]);
};

// 測試
(function () {
  console.log('Testing [p0416_partitionEqualSubsetSum]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb([1, 5, 11, 5]) === true);
    console.log(cb([1, 5, 10, 6]) === true);
    console.log(cb([1, 2, 3, 5]) === false);
    console.log(cb([14, 9, 8, 4, 3, 2]) === true);
    console.log(cb([10, 9, 9, 9, 9, 8, 7, 3, 1, 1]) === true);
    console.log(cb([20, 1, 16, 2, 17, 16, 8, 15, 7]) === true);

    // console.log(
    //   cb([
    //     100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    //     100, 100, 100, 100, 99, 97,
    //   ]) === false
    // );
  };

  testingWith(canPartitionBrute);
  testingWith(canPartitionUseSet);
  testingWith(canPartitionOptimal);

  console.log('All Testing Passed ✅');
})();
