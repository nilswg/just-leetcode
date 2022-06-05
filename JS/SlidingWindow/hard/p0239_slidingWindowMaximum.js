// @ts-check

// 題目鏈結
// https://leetcode.com/problems/sliding-window-maximum

// 題目說明
// You are given an array of integers nums, there is a sliding window of size k
// which is moving from the very left of the array to the very right. You can
// only see the k numbers in the window. Each time the sliding window moves right
// by one position.

// 解題重點
// 瞭解滑動窗，並使用 DeQuene 儲存位址，每次存放同時剔除小於的數。
// 優化速度上，shift為昂貴的操作，因可能減少其使用；
// 以位置來存放，好處是對比存放數值，儲放位址能剔除重複的數，減少shift的次數。

// 解題思路
/**
 * 思路一、暴力解
 *
 * 複雜度
 * Time Complexity : O((n-k+1)*k) => when k = n; O(n^2)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var brute = function (nums, k) {
  let n = nums.length;
  let min = -Math.pow(10, 4);
  let res = [];
  for (let i = 0; i < n - k + 1; i++) {
    let max = min;
    for (let j = i; j < i + k; j++) {
      max = Math.max(nums[j], max);
    }
    res.push(max);
  }
  return res;
};

/**
 * 思路二、使用 monotonicQuene
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 *
 *  k = 3,
 *  i   position                            monotonic quene        max         res
 *
 *  0   [3], 3,  -1,  -3,  5,  3,  6,  7        [3]                 3          []
 *
 *  1   [3,  3], -1,  -3,  5,  3,  6,  7        [3]                 3          []
 *                                              (相同也剔除； 但是位置被更新 0 -> 1)
 * ---------------------------------------------------------------------------------------- (i v= k - 1)
 *  2   [3,  3,  -1], -3,  5,  3,  6,  7        [3, -1]             3          [3]
 *
 *  3    3, [3,  -1,  -3], 5,  3,  6,  7        [3,-1, -3]          3          [3, 3]
 *
 *  4    3,  3,  [-1, -3,  5] ,3,  6,  7        [5]                 5          [3, 3, 5]
 *
 *  5    3,  3,  -1, [-3,  5,  3] ,6,  7        [5, 3]              5          [3, 3, 5, 5]
 *
 *  6    3,  3,  -1,  -3, [5,  3,  6], 7        [6]                 6          [3, 3, 5, 5, 6]
 *
 *  7    3,  3,  -1,  -3,  5, [3,  6,  7]       [7]                 7          [3, 3, 5, 5, 6, 7]
 *
 *  output : [ 3, 3, 5, 5, 6, 7 ]
 *
 *
 *  k = 1,
 *  i   position         monotonic quene        max         res
 *
 *  0   [1], -1,             [1]                 1          [1]
 *
 *  1    1, [-1],            [3]                 3          [-1]
 *
 *
 *  k = 2,
 *  i   position         monotonic quene        max         res
 *
 *  0   [7], 2,  4,          [7]                 7          []
 *
 *  1   [7,  2], 4,          [7, 2]              7          [7]
 *
 *  3    7, [2,  4],         [7, 2]              4          [7, 4]
 */

class MonotonicQuene {
  quene;
  constructor() {
    this.quene = [];
  }
  push(val) {
    /**
     * 把其他比自己小的都移除掉。
     *
     * before: quene [3,-2,-1] , push 3
     * after : quene [3, 3]
     */
    while (this.quene.length > 0 && val > this.quene[this.quene.length - 1]) {
      this.quene.pop();
    }
    this.quene.push(val);
  }
  pop() {
    return this.quene.shift();
  }
  max() {
    return this.quene[0];
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var useMonotonicQuene = function (nums, k) {
  if (nums.length < 2) {
    return nums;
  }
  const quene = new MonotonicQuene();
  let res = [];
  let lt = 0;
  for (let i = 0; i < k - 1; i++) {
    quene.push(nums[i]);
  }
  for (let i = k - 1; i < nums.length; i++) {
    quene.push(nums[i]);
    // window開始滑動。
    res.push(quene.max());
    // 檢查，接下來
    if (nums[lt] === quene.max()) {
      quene.pop();
    }
    lt += 1; //超過window大小，lt開始向右移動。
  }
  return res;
};

// 優化重點
// shift 是一個相當昂貴的運算式。
// 我們改用 quene 儲存 index 而不是值。
// 如此一來，便可用位址來判斷是否溢出範圍，使用 ">="，而非 ">"，便能大幅度地減少使用 shift

// BST 優化
// const quenePush = (i, val = nums[i]) => {
//   let l = 0;
//   let r = quene.length - 1;
//   while (l <= r) {
//     let m = Math.floor((l + r) / 2);
//     if (val === nums[quene[m]]) {
//       l = m;
//       break;
//     } else if (val > nums[quene[m]]) {
//       r = --m;
//     } else {
//       l = ++m;
//     }
//   }
//   quene.length = l + 1;
//   quene[l] = i;
// };

// Runtime: 347 ms, faster than 96.12% of JavaScript online submissions for Sliding Window Maximum.
// Memory Usage: 78.4 MB, less than 80.92% of JavaScript online submissions for Sliding Window Maximum.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function (nums, k) {
  const q = [];
  const res = [];
  const n = nums.length;
  k = Math.min(n, k); // <= 限制 k的大小不超過 nums.length;
  const quenePush = (q, i) => {
    while (q.length > 0 && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  };
  const quenePop = (q, i) => {
    if (q[0] <= i - k) {
      q.shift();
    }
  }
  for (let i = 0; i < n; i++) {
    quenePush(q, i);
    if (i >= k-1){
        quenePop(q, i);
        res.push(nums[q[0]]);
    }
  }
  return res;
};

// 測試
(function () {
  const isEqual = (arr1, arr2) => {
    // console.log(arr1);
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  console.log('Testing 0239_maxSlidingWindow 暴力解...');

  console.log(
    isEqual(brute([3, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7])
  );
  console.log(isEqual(brute([1], 1), [1]));
  console.log(isEqual(brute([7, 2, 4], 2), [7, 4]));
  console.log(isEqual(brute([1, -1], 1), [1, -1]));
  // console.log(isEqual(brute([1], 10), [1])); <= err
  console.log(isEqual(brute([], 10), []));

  console.log('Testing useMonotonicQuene ...');

  console.log(
    isEqual(
      useMonotonicQuene([3, 3, -1, -3, 5, 3, 6, 7], 3),
      [3, 3, 5, 5, 6, 7]
    )
  );
  console.log(isEqual(useMonotonicQuene([1], 1), [1]));
  console.log(isEqual(useMonotonicQuene([7, 2, 4], 2), [7, 4]));
  console.log(isEqual(useMonotonicQuene([1, -1], 1), [1, -1]));
  console.log(isEqual(useMonotonicQuene([1], 10), [1]));
  console.log(isEqual(useMonotonicQuene([], 10), []));

  console.log('Testing 0239_maxSlidingWindow ...');

  console.log(
    isEqual(maxSlidingWindow([3, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7])
  );
  console.log(isEqual(maxSlidingWindow([1, 3, 1, 2, 0, 5], 3), [3, 3, 2, 5]));
  console.log(isEqual(maxSlidingWindow([1], 1), [1]));
  console.log(isEqual(maxSlidingWindow([7, 2, 4], 2), [7, 4]));
  console.log(isEqual(maxSlidingWindow([1, -1], 1), [1, -1]));
  console.log(isEqual(maxSlidingWindow([1], 10), [1]));
  console.log(isEqual(maxSlidingWindow([], 10), []));

  console.log('All Testing Passed ✅');
})();
