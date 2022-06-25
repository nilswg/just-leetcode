// 題目鏈結
// https://leetcode.com/problems/kth-largest-element-in-an-array

// 題目說明

// 解題重點
// 1. 瞭解快速排序並實作。
// 2. 透過隨機 pivot，並交換至最左，來避免worst case
// 3. 快速排序每次partion 都能找到一個已確認位置的 pivot，
//    並且使 pivot 為分界，區隔兩側數。
// 4. 瞭解tail-recursion，能透過已確認位置p，排除一側分支，將空間複雜度從 O(N)->(1);

// 解題思路
// 使用 quickSelect

// 複雜度: quickSelect
//
// 時間複雜度: O(NlogN)
//  (一般來說，樹的深度是 log(n) + 1；又每層做 O(N) 的排序；故 T(N) = O(NlogN);)
// 空間複雜度: O(N)
//
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var quickSelect = function (nums, k) {
  const partition = (l, r) => {
    if (l >= r) return nums;
    let pivot = nums[l];
    let st = l;
    let ed = r;
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
    partition(st, l - 1);
    partition(l + 1, ed);
    return nums;
  };
  return partition(0, nums.length - 1)[k - 1];
};


// 使用 tail recursion 優化後的 quickSelect
// 時間複雜度: O(N)
//   The times to call patition recursively is n/2 + n/4 + n/8 ...
//   N + (n/2 + n/4 + n/8) = 2N
//   However, O(2N) is still O(N)
// 空間複雜度: O(1)
//   By tail recursion, only return one of branch,
//   so we can get O(1) space complexity
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {

  ///////////////// 關鍵一 /////////////////
  // 降低 worst case發生機會
  const getRandPivot = (l, r) => {
    if (l === r) return;
    let p = Math.floor(Math.random() * (r - l + 1)) + l;
    let pivot = nums[p];
    let temp = nums[l];
    nums[l] = nums[p];
    nums[p] = temp;
    return pivot;
  };
  //////////////////////////////////////////

  const partition = (l, r) => {
    if (l >= r) return nums;
    let pivot = getRandPivot(l, r); //隨機選出pivot，並與最左側元素交換。
    let st = l;
    let ed = r;
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

    ///////////////// 關鍵二 /////////////////
    // 透過已經被確認的點，不須等到全部排序完，得快速返回結果，
    // 並且，因為不用分割，每次都只關注其中一條分支，
    // 透過 tail recursion 的特性，空間複雜度從
    // O(N) -> O(1);
    if (l === k - 1) {
      return nums; //<== 透過此已確認的
    } else if (l > k - 1) {
      return partition(st, l - 1);
    } else {
      return partition(l + 1, ed);
    }
    ///////////////////////////////////////////

  };
  return partition(0, nums.length - 1)[k - 1];
};

// 測試
(function () {
  console.log('Testing quickSelect...');

  console.log(quickSelect([3, 2, 1, 5, 6, 4], 2) === 5);

  console.log('Testing findKthLargest...');
  console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2) === 5);

  console.log('All Testing Passed ✅');
})();
