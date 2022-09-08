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
