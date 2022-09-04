// @ts-check

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
// 1 <= k <= nums.length <= 104
// -104 <= nums[i] <= 104
//

// 解題重點
// 1. 瞭解快速排序並實作。
// 2. 透過隨機 pivot，並交換至最左，來避免worst case
// 3. 快速排序每次partion 都能找到一個已確認位置的 pivot，
//    並且使 pivot 為分界，區隔兩側數。
// 4. 瞭解tail-recursion，能透過已確認位置p，排除一側分支，將空間複雜度從 O(N)->(1);

// 解題思路
// 1. 使用 quickSelect

/**
 * Solution: quickSelect
 *
 * 1. 選定任一點作為 pivot，
 * 2. 以 l,r 雙指針方式搜尋數列，l最左；r最右
 * 3. 搜尋時，目標是讓每次 pivot 都被移動到它最終的位置，且形成的數列，pivot兩側的數會分別小於或大於它。
 *    (1) 假如是小到大排序: r 向左搜尋時，若 nums[r] >= pivot 跳過；l 向右搜尋時，若 nums[l] <= pivot 跳過
 *    (2) 反之，大到小排序: r 向左搜尋時，若 nums[r] <= pivot 跳過；l 向右搜尋時，若 nums[l] >= pivot 跳過
 *
 * 4. 每次partion都會是 pivot、nums[l]、nums[r] 的交換，形成:
 *
 *    nums[l] < pivot < nums[r] 或是 nums[l] > pivot > nums[r]
 *
 *    交換前，pivot為已知，r 先移動，nums[r] -> nums[l] ; nums[l] ->
 *
 * 一般來說，樹的深度是 logN + 1；又每層做 O(N) 的排序；故整棵樹的時間複雜度為 O(NlogN)
 * 時間複雜度: O(NlogN)
 * 空間複雜度: O(N)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var quickSelect = function (nums, k) {
  const partition = (st, ed) => {
    if (st >= ed) return nums;
    let pivot = nums[st];
    let l = st;
    let r = ed;
    while (l < r) {
      // 由於排序是大到小，所以當數值 <= pivot 會跳過
      while (l < r && nums[r] <= pivot) {
        r -= 1;
      }
      nums[l] = nums[r];
      // 由於排序是大到小，所以當數值 <= pivot 會跳過
      while (l < r && nums[l] >= pivot) {
        l += 1;
      }
      nums[r] = nums[l];
    }
    nums[l] = pivot;

    // 繼續partition
    partition(st, l - 1);
    partition(l + 1, ed);
    return nums;
  };
  return partition(0, nums.length - 1)[k - 1];
};

/**
 * Solution: Quick Select 使用 tail recursion 優化。
 *
 * 透過已經被確認的點，不須等到全部排序完，得快速返回結果，並且，因為不用分割，每次都只關注其中一條分支，
 * 透過 tail recursion 的特性，空間複雜度從 O(N) -> O(1);
 *
 * partition 每次固定以最左邊元素為 pivot，假如由小到大排列，先由右至左找出 a (小於pivot)；
 *           再左至右找出 b (大於pivot)； 將 a,b 倆倆戶換，算法為 l, r 雙指針從兩端相互靠攏，
 *           直到 l === r，離開迴圈，此時該重和位址，也是 pivot 最後的位址。
 * 
 * quickSelect 先從序列中決定一隨機位址，將其交換至最左側。再使用 partition 找出 pivot 最終所在的位址(p)。
 *           若 p 即是目標就返回，反之，則繼續搜尋，僅關注該目標可能出現的其中一側。
 *  
 * 時間複雜度: O(N)
 *   The times to call patition recursively is n/2 + n/4 + n/8 ...
 *   N + (n/2 + n/4 + n/8) = 2N
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
var findKthLargest = function (nums, k) {
  const target = k - 1;

  const partition = (nums, l, r) => {
    let pivot = nums[l];

    while (l < r) {
      while (l < r && nums[r] <= pivot) {
        r -= 1;
      }
      nums[l] = nums[r];
      while (l < r && nums[l] >= pivot) {
        l += 1;
      }
      nums[r] = nums[l];
    }
    nums[l] = pivot;
    return l;
  };

  const quickSelect = (st, ed) => {
    // 改用亂數產生 p 位址減少 WorstCase 機會。
    let p = Math.floor(Math.random() * (ed - st + 1)) + st;
    let pivot = nums[p];
    nums[p] = nums[st];
    nums[st] = pivot;

    p = partition(nums, st, ed);
    // 每次partition僅選擇一側，優化空間複雜。
    // 且不再返回整個nums，而是找到該位置的值立刻返回。
    if (p === target) {
      return nums[p];
    } else if (p > target) {
      return quickSelect(st, p - 1);
    } else {
      return quickSelect(p + 1, ed);
    }
  };

  return quickSelect(0, nums.length - 1);
};

// 測試
(function () {
  console.log('Testing [p0215_kthLargestElementInAnArray]...');

  console.log('Testing [quickSelect] ');
  console.log(quickSelect([3, 2, 1, 5, 6, 4], 2) === 5);

  console.log('Testing [findKthLargest]');
  console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2) === 5);

  console.log('All Testing Passed ✅');
})();
