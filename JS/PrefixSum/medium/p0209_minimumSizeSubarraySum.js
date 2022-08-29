// @ts-check

// 題目鏈結
// https://leetcode.com/problems/minimum-size-subarray-sum

// 題目說明
// Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.
//

// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
//

// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1
//

// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0
//

// Constraints:
// 1 <= target <= 10^9
// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^5
// Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).

// 解題重點
// 1. 瞭解 PrefixSum
// 2. 瞭解 SlidingWindow，分析比較為何使用 SlidingWindow 更適合此題。

// 解題思路
// 1. 以暴力解窮舉所有滿足條件組合求解
// 2. 使用前綴和去優化時間複雜度
// 3. 基於一個遞增序列，相當於排序過的序列，便可使用二分查找求下標得到最短長度。
// 4. 考慮Greedy, 以滑動窗來求解, 可參考 p0003作法，進一步比較兩題空間複雜度的差異原因。

/**
 * Solution : 暴力解, 窮舉所有可能
 *
 * 複雜度
 * Time Complexity : O(N^3)
 * Space Complexity: O(1)
 */

var minSubArrayLenBrute = function (target, nums) {
  let n = nums.length;
  let res = Infinity;
  let sum = 0;
  for (let l = 0; l < n; l++) {
    for (let r = l; r < n; r++) {
      sum = 0;
      for (let i = l; i <= r; i++) {
        sum += nums[i];
      }
      if (sum >= target) {
        res = Math.min(res, r - l + 1);
      }
    }
  }
  return res !== Infinity ? res : 0;
};

/**
 * Solution : 以Prefix進行優化
 *
 * 複雜度
 * Time Complexity : O(N^2)
 * Space Complexity: O(N)
 */

var minSubArrayLenPrefixSum = function (target, nums) {
  let n = nums.length;
  let res = Infinity;
  let sums = [];
  sums[-1] = 0; // 因 sums[l], l 會有 -1 的時候。
  for (let i = 0; i < n; i++) {
    sums[i] = sums[i - 1] + nums[i];
  }
  for (let l = -1; l < n - 1; l++) {
    for (let r = l + 1; r < n; r++) {
      const sum = sums[r] - sums[l];
      if (sum >= target) {
        res = Math.min(res, r - l);
      }
    }
  }

  return res !== Infinity ? res : 0;
};

/**
 * Solution : 基於遞增序列可視作已排序過的陣列，使用二分查找來優化。
 *
 * 1. 外層迴圈遍歷 l, 所以是假設 l 已知下，去找r，使 nums[r] - nums[l] >= target
 * 2. 外圈的起始值該為 -1，因為 r 為 0 時， 使 0-(-1)最小長度為 1。  
 * 3. 內圈使用二分搜尋，找到 r 使條件需滿足: sums[r] >= sums[l] + target; (k = sums[l] + target)
 *    (1) 找到 k, 即返回該位址
 *    (2) 無法找到 k, 則再檢查是否該位址(r)是否有效，需滿足 r < sums.length。
 *        a. 有效，表示找到大於k的第一個數值。
 *        b. 超出範圍，則不存在此數值。 
 *
 * 複雜度
 * Time Complexity : O(NlogN)
 * Space Complexity: O(N)
 */

var minSubArrayLenBinarySearch = function (target, nums) {
  let n = nums.length;
  let res = Infinity;
  let sums = [];
  sums[-1] = 0; // 因 sums[l], l 會有 -1 的時候。
  for (let i = 0; i < n; i++) {
    sums[i] = sums[i - 1] + nums[i];
  }

  const bs = (nums, k) => {
    let l = -1;
    let r = n - 1;
    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      if (nums[m] === k) return m;
      else if (nums[m] < k) l = m + 1;
      else r = m - 1;
    }
    return l;
  };

  // 由左l, 去找滿足條件的右r
  for (let l = -1; l < n; l++) {
    const sumsR = sums[l] + target;
    const r = bs(sums, sumsR);
    if (r < n && r > l) {
      // r > l 可以省略，因為一定成立。
      res = Math.min(res, r - l);
    }
  }

  return res !== Infinity ? res : 0;
};

/**
 * Solution : 使用滑動窗優化實間複雜度
 *
 * 1. 透過雙指針，lt, i 去控制窗口的大小，
 * 2. 每次新增一個元素時，就去查看窗口內的所有元素
 * 3. 當發現有 >=target 的元素，就移動 lt到該元素的位址，以縮小滑動窗大小。
 *    (基於沒有負數的序列，所以其加總必定為不斷上升，
 *
 *     5,  4,  3,  2
 *
 * ->  5,  9, 12, 14, target = 7     res
 * ->  [ ]
 * ->  [    ]
 * ->  [       ]      , 12 > 7     ,  3
 * ->      [    ]     ,  7 = 7     ,  2
 * ->      [       ]  ,  5 < 7 (X) ,  2
 *
 *
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 */

var minSubArrayLenSlidingWindow = function (target, nums) {
  let res = Infinity;
  let sum = 0;
  let lt = -1;
  for (let i = 0, n = nums.length; i < n; i++) {
    sum += nums[i];
    while (sum >= target && lt < i) {
      // lt < i 此處可以省略
      res = Math.min(res, i - lt);
      sum -= nums[++lt];
    }
  }
  return res !== Infinity ? res : 0;
};

// 測試
(function () {
  console.log("Testing [p0209_minimumSizeSubarraySum]...");

  const testingWith = (cb) => {
    console.log(`Testing [${cb.name}]`);
    console.log(cb(7, [2, 3, 1, 2, 4, 3]) === 2);
    console.log(cb(4, [1, 4, 4]) === 1);
    console.log(cb(11, [1, 1, 1, 1, 1, 1, 1, 1]) === 0);
    console.log(cb(15, [1, 2, 3, 4, 5]) === 5);
  };

  testingWith(minSubArrayLenBrute);
  testingWith(minSubArrayLenPrefixSum);
  testingWith(minSubArrayLenBinarySearch);
  testingWith(minSubArrayLenSlidingWindow);

  console.log("All Testing Passed ✅");
})();
