// @ts-check

import { Heap } from '../../Heap/heap.js';

// 題目鏈結
// https://leetcode.com/problems/kth-largest-element-in-an-array

// 題目說明
// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
//

// Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
//

// Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4
//

// Constraints:
// 1 <= k <= nums.length <= 10⁴
// -10⁴ <= nums[i] <= 10⁴
//

// 解題重點
// 1. 瞭解快速排序並實作。
// 2. 透過隨機 pivot，並交換至最左，來避免worst case
// 3. 快速排序每次partion 都能找到一個已確認位置的 pivot，
//    並且使 pivot 為分界，區隔兩側數。
// 4. 瞭解tail-recursion，能透過已確認位置p，排除一側分支，將空間複雜度從 O(N)->(1);

// 解題思路
// 1. 使用 QuickSort
// 2. 使用 HeapSort

/**
 * Solution: QuickSort + tail recursion 優化。
 *
 * (完整的QuickSort請參考 quickSort.md)
 *
 * 1. 基於QuickSort的特性，每次能找出一確認位址的 nums[p]，且將整個序列分成 小於nums[p] 與 大於nums[p] 的兩個區段，
 *    若 p 即是目標(k-1)就返回 nums[p]，反之，則繼續搜尋，且關注目標可能出現的其中一側。
 *    由於每次僅關注一側，故不須等到全部排序完。再透過 tail recursion，優化空間複雜度 O(N) -> O(1);
 *
 * 2. pivot 為序列中隨機位址。(須交換至 partition 固定作為pivot的位址，一般是最左側或最右側)
 *
 * 時間複雜度: O(N)
 *   The times to call patition recursively is n/2 + n/4 + n/8 ...
 *   N + (n/2 + n/4 + n/8) ≓ N/(1-(1/2)) = 2N
 *   However, O(2N) is still O(N)
 *
 * 空間複雜度: O(1)
 *   By tail recursion, only return one of branch,
 *   so we can get O(1) space complexity
 *
 * @param {*} nums
 * @param {*} k
 * @returns
 */
var findKthLargestQuickSort = function (nums, k) {
  const target = k - 1;

  const swap = (i, j) => {
    if (i === j) return;
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  const partition = (nums, l, r) => {
    const pivot = nums[r];
    for (let i = l; i < r; i++) {
      // 由於是大到小，所以是找尋確認較大的數至最左側。
      if (nums[i] >= pivot) {
        swap(l, i);
        l += 1;
      }
    }
    swap(l, r);
    return l;
  };

  const quickSort = (st, ed) => {
    // if (st >= ed) return null;

    // 改用亂數產生 p 位址減少 WorstCase 機會。
    let rand = Math.floor(Math.random() * (ed - st + 1)) + st;
    swap(rand, ed);

    let p = partition(nums, st, ed);
    // 每次partition僅選擇一側，優化空間複雜。
    // 且不再返回整個nums，而是找到該位置的值立刻返回。
    if (p === target) {
      return nums[p];
    } else if (p > target) {
      return quickSort(st, p - 1);
    } else {
      return quickSort(p + 1, ed);
    }
  };

  return quickSort(0, nums.length - 1);
};

/**
 * Solution: 使用Heap優化，雖不如QuickSort好，但是Heap是相對重要且更常見的資料結構。
 *
 *
 * @param {*} nums
 * @param {*} k
 * @returns
 */
var findKthLargestHeap = function (nums, k) {
  const minHeap = new Heap((a, b) => a < b);
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }
  return minHeap.peek();
};

// 測試
(function () {
  console.log('Testing [p0215_kthLargestElementInAnArray]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb([3, 2, 1, 5, 6, 4], 2) === 5);
    console.log(cb([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) === 4);
  };
  testingWith(findKthLargestQuickSort);
  testingWith(findKthLargestHeap);

  console.log('All Testing Passed ✅');
})();
