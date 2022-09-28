# Quick Sort

### 簡易的 QuickSort

### partition 流程

1. 選定任一點作為 pivot，
2. 以 l,r 雙指針方式搜尋數列，l 最左；r 最右
3. 搜尋時，目標是讓每次 pivot 都被移動到它最終的位置，且形成的數列，pivot 兩側的數會分別小於或大於它。
4. 每次 partion 形成: nums[l] < pivot < nums[r] 或是 nums[l] > pivot > nums[r]

### 複雜度分析

一般來說，樹的深度是 logN + 1；又每層做 O(N) 的排序；故整棵樹的時間複雜度為 O(NlogN)

- 時間複雜度: O(NlogN)
- 空間複雜度: O(N)

```js
const swap = (i, j) => {
  if (i === j) return;
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
};

/**
 * pivot: 固定為最右側元素。 nums[r]
 *
 * ">=" :  [ 大 | 小 ]
 *              ^pivot
 *
 * "<=" :  [ 小 | 大 ]
 *              ^pivot
 */
const partition = (nums, l, r) => {
  const pivot = nums[r];
  for (let j = l; j < r; j++) { // j 指向當前檢查的對象，l代表pivot左側的元素
    if (nums[j] >= pivot) {
      swap(l, j);
      l += 1;
    }
  }
  swap(l, r); //最後再交換一次，把pivot換到確定位址。
  return l;
};

const quickSort = (st, ed) => {
  if (st >= ed) return;
  const p = partition(nums, st, ed);
  quickSort(st, p - 1);
  quickSort(p + 1, ed);
  return nums;
};
return quickSort(0, nums.length - 1)[k - 1];
```

### 另一種 partition 寫法

```js
/**
 *
 * 每次固定以最左邊元素為 pivot，假如由小到大排列，先由右至左找出 a (小於pivot)；
 * 再左至右找出 b (大於pivot)； 將 a,b 倆倆戶換，算法為 l, r 雙指針從兩端相互靠攏，
 *  (1) 假如是小到大排序: r 向左搜尋時，若 nums[r] >= pivot 跳過；l 向右搜尋時，若 nums[l] <= pivot 跳過
 *  (2) 反之，大到小排序: r 向左搜尋時，若 nums[r] <= pivot 跳過；l 向右搜尋時，若 nums[l] >= pivot 跳過
 *
 * 直到 l === r，離開迴圈，此時該重和位址，也是 pivot 最後的位址。
 */
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
  nums[l] = pivot; // 把pivot換到確定位址。
  return l;
};
```

### 透過亂數避免最糟狀況

先從序列中決定一隨機位址，將其交換至最左側。再使用 partition 找出 pivot 最終所在的位址(p)。
若 p 即是目標就返回，反之，則繼續搜尋，僅關注該目標可能出現的其中一側。

```js
const getRandomPivot = () => {
  return Math.floor(Math.random() * (ed - st + 1)) + st;
};

const quickSort = (st, ed) => {
  if (st >= ed) return;
  swap(st, getRandomPivot());  // 隨機取位址，交換至最左側
  const p = partition(st, ed); // 假設此partition 固定從左側(st)作為 pivot。
  quickSort(st, p - 1);
  quickSort(p + 1, ed);
  return nums;
};
```
