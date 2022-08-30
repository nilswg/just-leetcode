# Stack

說明: 棧，先進先出

### 基本的棧操作方法
---
```js
let stack = [];

stack.push(-1);
stack.push(-2);
stack.push(-3);
stack.pop(); // -3
stack.pop(); // -2

// peek
console.log(stack[stack.length-1]); // -1
stack.pop(); // -1
```

### JS 中的棧

JS的 Array 雖然除了常見的 push、pop 方法外；還提供如 shift、unshift 等，讓你可以以此實作 queue 的方法。

但需注意這些方法: ```shift、unshift 的時間複雜度仍為 O(N)```
。因此，在對於時間複雜度有要求的題目裡要謹慎使用。

```js
let arr = [1,2,3];

arr.shift() // 1
arr.shift() // 2

arr.unshift(5) // 移入5到前端
console.log(arr) // [5,3]
```

### 基於單向鏈結串鏈實作棧(可參考p0155)
---
```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.head = new ListNode(null, Infinity);
  }
  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    const node = new ListNode(val, this.head);
    this.head = node;
  }
  /**
   * @return {void}
   */
  pop() {
    const pre = this.head;
    this.head = this.head.next;
    return pre.val;
  }
  /**
   * @return {number}
   */
  peek() {
    return this.head.val;
  }
}
```
