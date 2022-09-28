### BackTracking

BackTracking 也是 DFS 的一種，適合用於窮舉所有可能的解。

## Permutations v.s Combinations

Permutations 輸出相同元素，順序不同視為不同組合，
Combinations 輸出相同元素，順序不同視為相同組合，

### Permutations

---

```js
const nums = [1, 2, 3]; // 由小到大的序列。
const used = {};
let ans = [];
const dfs = (n, curr) => {
  if (n === 0) {
    ans.push([...curr]);
  }
  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    curr.push(nums[i]);
    dfs(n - 1, curr);
    curr.pop();
    used[i] = false;
  }
};
dfs(nums.length, []);
console.log(ans); // [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### Combination

---

```js
const nums = [1, 2, 3]; // 由小到大的序列。
let ans = [];

const dfs = (n, st, curr) => {
  if (n === 0) {
    ans.push([...curr]);
  }
  for (let i = st; i < nums.length; i++) {
    curr.push(nums[i]);
    dfs(n - 1, i + 1, curr); // i+1 不是 st+1
    curr.pop();
  }
};

ans = [];
dfs(3, 0, []);
console.log(ans); //  Cn取3, [[1,2,3]]

ans = [];
dfs(2, 0, []);
console.log(ans); //  Cn取2, [[1,2], [1,3], [2,3]]

ans = [];
dfs(1, 0, []);
console.log(ans); //  Cn取1, [[1], [2], [3]]
```



### Subsets
Subset 是蒐集所有子集合，其中子集的長度有關。
對比 Combination 是到達指定的長度時，才會蒐集起來， Subset 則是無論長度無何都會蒐集
另外，Subset起始狀態為[]； res 作為輸出的總集合，其初始狀態為 [[]]，須考慮空集合 

```js
/**
 * 時間複雜度分析
 * 總共形成 2ⁿ 個子集合，其中，子集合中最大長度為 n。 所以共有 n*2ⁿ
 * 故總元素的計算為: ( (1+n)*(2ⁿ) / 2) ≓ O(n*2ⁿ)/2 ≓ O(n2ⁿ)
 * 
 * 空間複雜度分析
 * res 的最終長度為 2ⁿ 個子集合，子集合中最大長度為 n。 但此處僅考慮 n 的大小，故時間複雜度為 O(n)
 *
 * 
 * 複雜度
 * Time Complexity : O(n2ⁿ) // sums中的總元素
 * Space Complexity: O(n)   // 僅考慮計算中出現的最大子集合長度，即 n
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  if (nums.length === 1) return [[], [nums[0]]];

  const n = nums.length;
  const res = [];

  // nums.sort(); // 避免重覆所以先排序
  const dfs = (st, subset) => {
    res.push([...subset]);
    for (let i = st; i < n; i++) {
      // if (i > 0 && nums[i] === nums[i-1]) continue; // 避免重覆

      subset.push(nums[i]);
      dfs(i + 1, subset);
      subset.pop();
    }
  };

  dfs(0, []);
  return res;
};
```
